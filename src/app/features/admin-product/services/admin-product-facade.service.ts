import { Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, take, tap, mergeMap, takeUntil } from 'rxjs/operators';
import { FirebaseResponse } from '@app/features/core/firebase/models/firebase.response.model';

import { NotificationService } from '@app/features/core/notifications/notification.service';
import { FeaturesFacadeService } from '@app/features/core/firebase/services/features-facade.service';
import { FirebaseFirestoreService } from '@app/features/core/firebase/services/firestore.service';
import { FirebaseFirestorageService } from '@app/features/core/firebase/services/firestorage.service';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Injectable({
  providedIn: 'root',
})
export class AdminProductFacadeService extends FeaturesFacadeService {
  constructor(
    public notificationService: NotificationService,
    public firestoreService: FirebaseFirestoreService,
    public firestorageService: FirebaseFirestorageService,
    private subscriptionService: SubscriptionService
  ) {
    super(notificationService);
  }

  public getProducts(): Observable<Action> {
    return this.firestoreService.getObjects$().pipe(
      takeUntil(this.subscriptionService.unsubscribe$),
      mergeMap(item => item),
      map((firebaseResult: any) => {
        return {
          type: this.firestoreService.getActionToDispatch(firebaseResult.type),
          product: { id: firebaseResult.payload.doc.key, ...firebaseResult.payload.doc.data() },
        };
      })
    );
  }

  public getCarouselProducts(): Observable<Action> {
    return from(this.firestorageService.getImageList$()).pipe(
      takeUntil(this.subscriptionService.unsubscribe$),
      mergeMap(item => item),

      map((firebaseResult: any) => {
        return {
          type: '[Product/API] Add Carousel Product',
          item: { id: firebaseResult.id, src: firebaseResult.src },
        };
      })
    );
  }
}
