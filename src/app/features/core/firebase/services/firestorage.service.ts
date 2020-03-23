import { Injectable } from '@angular/core';

import { environment } from '@enviroments/environment';
import { AngularFireStorage } from '@app/features/core/firebase/firebase.module';
import { FirestorageResponse } from '@app/features/core/firebase/models/firebase.response.model';

@Injectable({
  providedIn: 'root',
})
export class FirebaseFirestorageService {
  private basePath = environment.storageConfig.basePath;
  private prefixPath = environment.storageConfig.prefixPath;
  private sufixPath = environment.storageConfig.sufixPath;
  private imagesDirectory = environment.storageConfig.imagesDirectory;

  constructor(private angularFireStorage: AngularFireStorage) {}

  public async getImageList$(id: string = this.imagesDirectory): Promise<FirestorageResponse[]> {
    const result: FirestorageResponse[] = [];

    await this.angularFireStorage.storage
      .refFromURL(this.basePath)
      .child(id)
      .listAll()
      .then(storage =>
        storage.items.forEach(item => {
          return result.push({
            id: item.name,
            src: this.prefixPath + item.fullPath.replace('#', '%23').replace('/', '%2F') + this.sufixPath,
          });
        })
      )
      .catch(error => console.log('Error:', error));
    return result;
  }
}
