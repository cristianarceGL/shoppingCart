import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TestBed, inject } from '@angular/core/testing';
import { BehaviorSubject, Subscription, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { OrderCheckoutGuard } from './order-checkout.guard';
import { AuthService } from '@app/features/authentication/auth.service';
import { Authenticate, User } from '@app/features/authentication/models';
import { AngularFireAuth } from '@app/features/core/firebase/firebase.module';
import { MatSnackBarComponent, MaterialModule } from '@app/shared/shared.module';
import { authenticate, user, mockedState, mockOrder } from '@app/mockdata/data/models-data';

const fakeAuthState = new BehaviorSubject(null);

const angularFireAuthStub = {
  authState: fakeAuthState,
};

class RouterStub {
  url = 'products';
  navigate(commands: any[], extras?: any) {}
}

describe('AuthGuard - No items in cart', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;
  let mockAuthentication: Authenticate;
  let mockUser: User;
  const noItemsInCart = mockedState;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useClass: RouterStub },
        MatSnackBarComponent,
        OrderCheckoutGuard,
        provideMockStore({ initialState: noItemsInCart }),
      ],
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
    mockAuthentication = authenticate.authenticate;
    mockUser = user.user;
  });

  beforeEach(() => {
    isAuth$ = service.isAuthenticated$.subscribe(isAuth => {
      isAuthRef = isAuth;
    });
  });

  afterEach(() => {
    fakeAuthState.next(null);
    isAuth$.unsubscribe();
  });

  it('should disable navigation when no user authenticated', inject(
    [OrderCheckoutGuard],
    (guard: OrderCheckoutGuard) => {
      spyOnProperty(service, 'isAuthenticated$').and.returnValue(of(false));
      guard.canActivate().subscribe(result => {
        expect(result).toBeFalsy();
      });
    }
  ));

  it('should disable navigation to orders/checkout when no items in cart', inject(
    [OrderCheckoutGuard],
    (guard: OrderCheckoutGuard) => {
      spyOnProperty(service, 'isAuthenticated$').and.returnValue(of(true));
      guard.canActivate().subscribe(result => {
        expect(result).toBeFalsy();
      });
    }
  ));
});

describe('AuthGuard - Do have items in cart', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;
  let mockAuthentication: Authenticate;
  let mockUser: User;
  const noItemsInCart = {
    ...mockedState,
    order: mockOrder,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useClass: RouterStub },
        MatSnackBarComponent,
        OrderCheckoutGuard,
        provideMockStore({ initialState: noItemsInCart }),
      ],
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
    mockAuthentication = authenticate.authenticate;
    mockUser = user.user;
  });

  beforeEach(() => {
    isAuth$ = service.isAuthenticated$.subscribe(isAuth => {
      isAuthRef = isAuth;
    });
  });

  afterEach(() => {
    fakeAuthState.next(null);
    isAuth$.unsubscribe();
  });

  it('should enable the navigation when items in cart', inject([OrderCheckoutGuard], (guard: OrderCheckoutGuard) => {
    spyOnProperty(service, 'isAuthenticated$').and.returnValue(of(true));
    guard.canActivate().subscribe(result => {
      expect(result).toBeTruthy();
    });
  }));
});
