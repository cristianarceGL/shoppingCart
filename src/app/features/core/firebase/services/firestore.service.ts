import { Observable } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@app/features/core/firebase/firebase.module';

import { SubscriptionType } from '@app/features/core/common/enums/firebase.enum';
import { stringify } from 'querystring';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestoreService {
  protected basePath = 'products';

  constructor(private firestore: AngularFirestore) {}

  public getObject$(id: string): any {
    return this.firestore.doc(`${this.basePath}/${id}`).snapshotChanges();
  }

  public getObjects$(subscriptionType: SubscriptionType = SubscriptionType.stateChanges): Observable<any> {
    if (subscriptionType === SubscriptionType.stateChanges) {
      return this.firestore.collection(`${this.basePath}`).stateChanges();
    }
    if (subscriptionType === SubscriptionType.snapshotChanges) {
      return this.firestore.collection(`${this.basePath}`).snapshotChanges();
    }
    return this.firestore.collection(`${this.basePath}`).valueChanges();
  }

  public patchObject(baseUrl: string, keyValues: {}): void {
    this.firestore.doc(`${baseUrl}`).update(keyValues);
  }

  public putObject(baseUrl: string, keyValues: {}): void {
    this.firestore.doc(`${baseUrl}`).set(keyValues);
  }

  public deleteObjectBulk(baseUrl: string): void {
    this.firestore.doc(`${baseUrl}`).delete();
  }

  public getActionToDispatch(expression: string): string {
    let result = '';
    result = !result && expression === 'added' ? '[Product/API] Add Product' : result;
    result = !result && expression === 'child_changed' ? '[Product/API] Update Product' : result;
    result = !result && expression === 'child_removed' ? '[Product/API] Delete Product' : result;
    return result;
  }
}
