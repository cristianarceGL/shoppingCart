import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { Authenticate, User } from './models';
import { authenticate, user } from '@app/mockdata/data/models-data';
import { SnackBarComponent, MaterialModule } from '@app/shared/shared.module';

const fakeAuthState = new BehaviorSubject(null);

const fakeSignInHandler = (email, password): Promise<any> => {
  fakeAuthState.next(user.user);
  return Promise.resolve(user.user);
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
  let mockAuthentication: Authenticate;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MaterialModule],
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: angularFireAuthStub },
        { provide: Router, useClass: RouterStub },
        SnackBarComponent,
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not be initially authenticated', () => {
    expect(isAuthRef).toBe(false);
  });

  it('should be authenticated after logging in', () => {
    service.logIn(mockAuthentication);

    expect(afAuth.auth.signInWithEmailAndPassword).toHaveBeenCalledWith(
      mockAuthentication.email,
      mockAuthentication.password
    );
    expect(isAuthRef).toBeTruthy();
  });

  it('should not be authenticated after logging out', () => {
    fakeAuthState.next(mockUser);
    expect(isAuthRef).toBe(true);

    service.logOut();

    expect(isAuthRef).toBe(false);
  });

  it('should invoke it’s onError function', () => {
    service.logIn(mockAuthentication);
    let userToCompare;
    afAuth.authState
      .pipe(map(result => (result !== null ? result : null)))
      .subscribe(stateUser => (userToCompare = stateUser));
    expect(userToCompare).toEqual(mockUser);
    afAuth.authState.pipe(map(userState => userState !== null));
  });

  it('should check whether the user is authenticate = true', () => {
    let isUserAuthenticated = false;

    service.logIn(mockAuthentication);
    service.isAuthenticated$
      .pipe(map(userRes => userRes !== null))
      .subscribe(isAuthenticated => (isUserAuthenticated = isAuthenticated));

    expect(isUserAuthenticated).toBe(true);
  });

  it('should get the current user', () => {
    let currentUser = null;

    service.logIn(mockAuthentication);
    service.currentUser$.pipe(map(userRes => userRes)).subscribe(userSubs => (currentUser = userSubs));

    expect(currentUser).toBe(mockUser);
  });
});
