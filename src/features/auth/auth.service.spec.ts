import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

const credentialsMock = {
  email: 'shopping@gorilla.com',
  password: '123456',
};

const userMock = {
  uid: 'ABC123',
  email: credentialsMock.email,
};

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(userMock);
  return Promise.resolve(userMock);
};

const fakeSignOutHandler = (): Promise<any> => {
  fakeAuthState.next(null);
  return Promise.resolve();
};

const angularFireAuthStub = {
  authState: fakeAuthState,
  auth: {
    createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.callFake(fakeSignInHandler),
    signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.callFake(fakeSignInHandler),
    signOut: jasmine.createSpy('signOut').and.callFake(fakeSignOutHandler),
  },
};

class RouterStub {
  url = 'products';
  navigate(commands: any[], extras?: any) {}
}

describe('UserService', () => {
  let service: AuthService;
  let afAuth: AngularFireAuth;
  let isAuth$: Subscription;
  let isAuthRef: boolean;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useClass: RouterStub },
      ],
    });

    service = TestBed.get(AuthService);
    afAuth = TestBed.get(AngularFireAuth);
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be initially authenticated', () => {
    expect(isAuthRef).toBe(false);
  });

  it('should be authenticated after logging in', () => {
    service.logIn(credentialsMock);

    expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      credentialsMock.email,
      credentialsMock.password
    );
    expect(isAuthRef).toBeTruthy();
  });

  it('should not be authenticated after logging out', () => {
    fakeAuthState.next(userMock);
    expect(isAuthRef).toBe(true);

    service.logOut();

    expect(isAuthRef).toBe(false);
  });

  it('should invoke it’s onError function', () => {
    service.logIn(credentialsMock);
    let user;
    afAuth.authState.pipe(map(result => (result !== null ? result : null))).subscribe(stateUser => (user = stateUser));
    expect(user).toEqual(userMock);
    afAuth.authState.pipe(map(userState => userState !== null));
  });

  it('should check whether the user is authenticate = true', () => {
    let isUserAuthenticated = false;

    service.logIn(userMock);
    service.isAuthenticated$
      .pipe(map(user => user !== null))
      .subscribe(isAuthenticated => (isUserAuthenticated = isAuthenticated));

    expect(isUserAuthenticated).toBe(true);
  });

  it('should get the current user', () => {
    let currentUser = null;

    service.logIn(userMock);
    service.currentUser$.pipe(map(user => user)).subscribe(user => (currentUser = user));

    expect(currentUser).toBe(userMock);
  });
});
