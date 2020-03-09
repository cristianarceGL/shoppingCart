import { Observable, from, of } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { AngularFireStorage } from '@app/features/core/firebase/firebase.module';

import { SubscriptionType } from '@app/features/core/common/enums/firebase.enum';
import { stringify } from 'querystring';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestorageService {
  private basePath = 'gs://gl-shoppingcart.appspot.com';
  private prefixPath = 'https://firebasestorage.googleapis.com/v0/b/gl-shoppingcart.appspot.com/o/';
  private sufixPath = '?alt=media';

  constructor(private angularFireStorage: AngularFireStorage) {}

  public async getImageList$(id: string = '/Epic#4-ProductList'): Promise<any> {
    const result = [];

    await this.angularFireStorage.storage
      .refFromURL(this.basePath)
      .child(id)
      .listAll()
      .then(res =>
        res.items.forEach(x => {
          return result.push({
            id: x.name,
            src: this.prefixPath + x.fullPath.replace('#', '%23').replace('/', '%2F') + this.sufixPath,
          });
        })
      )
      .catch(error => console.log('Error:', error));
    return result;
  }
}
