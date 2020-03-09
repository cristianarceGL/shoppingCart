import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { AngularFireStorageModule, AngularFireStorage } from '@angular/fire/storage';
import { AngularFireDatabaseModule, AngularFireDatabase } from '@angular/fire/database';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreModule,
  DocumentChangeAction,
} from '@angular/fire/firestore';

import { environment } from '@enviroments/environment';

export { AngularFirestore };
export { AngularFireStorage };
export { AngularFireDatabase };
export { DocumentChangeAction };
export { AngularFirestoreDocument };

const modules = [
  AngularFirestoreModule,
  AngularFireDatabaseModule,
  AngularFirestoreModule,
  AngularFireAuthModule,
  AngularFireStorageModule,
];

@NgModule({
  imports: [...modules, AngularFireModule.initializeApp(environment.firebaseConfig)],
  exports: [...modules, AngularFireModule],
  providers: [AngularFireAuthGuard],
})
export class FirebaseModule {}
