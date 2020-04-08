import { Action } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, mergeMap, takeUntil } from 'rxjs/operators';

import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';
import { FirebaseFirestoreService } from '@app/features/core/firebase/services/firestore.service';
import { FirebaseFirestorageService } from '@app/features/core/firebase/services/firestorage.service';
import { FirestoreResponse, FirestorageResponse } from '@app/features/core/firebase/models/firebase.response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductFacadeService {
  constructor(
    public firestoreService: FirebaseFirestoreService,
    public firestorageService: FirebaseFirestorageService,
    private subscriptionService: SubscriptionService
  ) {}

  public getProducts(): Observable<Action> {
    return this.firestoreService.getObjects$().pipe(
      takeUntil(this.subscriptionService.unsubscribe$),
      mergeMap(item => item),
      map((firebaseResult: FirestoreResponse) => ({
        type: this.getActionToDispatch(firebaseResult.type),
        product: { id: firebaseResult.payload.doc.key, ...firebaseResult.payload.doc.data() },
      }))
    );
  }

  public getCarouselProducts(): Observable<Action> {
    return from(this.firestorageService.getImageList$()).pipe(
      takeUntil(this.subscriptionService.unsubscribe$),
      mergeMap(item => item),
      map((firebaseResult: FirestorageResponse) => ({
        type: '[Product/API] Add Carousel Product',
        item: { id: firebaseResult.id, src: firebaseResult.src },
      }))
    );
  }

  private getActionToDispatch(expression: string): string {
    let result = '';
    result = !result && expression === 'added' ? '[Product/API] Add Product' : result;
    result = !result && expression === 'child_changed' ? '[Product/API] Update Product' : result;
    result = !result && expression === 'child_removed' ? '[Product/API] Delete Product' : result;
    return result;
  }
}
