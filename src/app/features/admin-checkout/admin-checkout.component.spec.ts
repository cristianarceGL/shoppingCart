// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { provideMockStore } from '@ngrx/store/testing';
// import { AdminProductComponent } from './admin-checkout.component';
// import { AdminProductModule } from './admin-checkout.module';
// import { StoreModule } from '@ngrx/store';
// import { productReducer } from './+state/+checkout.reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { RouterTestingModule } from '@angular/router/testing';
// import { AngularFireModule } from '@angular/fire';
// import { environment } from '@enviroments/environment';
// import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { ReplaySubject } from 'rxjs';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
// import { AngularFireStorageModule } from '@angular/fire/storage';

// describe('AdminProductComponent', () => {
//   let component: AdminProductComponent;
//   let fixture: ComponentFixture<AdminProductComponent>;

//   const locationStub = {
//     onPopState: jasmine.createSpy('onPopState'),
//   };

//   beforeEach(async(() => {
//     const initialState = {
//       product: {
//         ids: [],
//         entities: {},
//         loading: false,
//       },
//     };

//     TestBed.configureTestingModule({
//       imports: [
//         AdminProductModule,
//         StoreModule.forRoot({ productReducer }),
//         RouterTestingModule,
//         AngularFireModule.initializeApp(environment.firebaseConfig),
//         AngularFireDatabaseModule,
//         AngularFirestoreModule,
//         AngularFireStorageModule,
//         EffectsModule.forRoot([]),
//       ],
//       providers: [
//         provideMockStore({ initialState }),
//         { provide: Location, useValue: locationStub },
//         // provideMockActions(() => actions),
//       ],
//     });
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AdminProductComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
