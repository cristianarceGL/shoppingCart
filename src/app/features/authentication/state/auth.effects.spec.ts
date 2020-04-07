import { ReplaySubject, of, throwError } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { provideMockActions } from '@ngrx/effects/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { MaterialModule } from '@app/shared/material';
import { environment } from '@enviroments/environment';
import { SnackBarComponent } from '@app/shared/shared.module';
import { authenticate, user } from '@app/mockdata/data/models-data';
import { AuthService } from '@app/features/authentication/auth.service';
import { AuthEffects } from '@app/features/authentication/state/auth.effects';
import * as authActions from '@app/features/authentication/state/auth.actions';

describe('Auth Effects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        MaterialModule,
      ],
      providers: [
        AngularFireAuth,
        {
          provide: AuthService,
          useValue: jasmine.createSpyObj('authService', ['logIn', 'logOut']),
        },
        AuthEffects,
        provideMockActions(() => actions),
        SnackBarComponent,
      ],
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  it(`should call the login service and cause an error`, () => {
    actions = new ReplaySubject(1);
    authService.logIn.and.returnValue(throwError('Unhandle Error'));
    actions.next(authActions.notAuthenticated(authenticate));

    effects.login$.subscribe(result => {
      expect(result).toEqual(authActions.notAuthenticated('Unhandle Error'));
      expect(authService.logIn).toHaveBeenCalledTimes(1);
    });
  });

  it(`should call the login service and cause an error`, () => {
    actions = new ReplaySubject(1);
    authService.logIn.and.returnValue(throwError('Unhandle Error'));
    actions.next(authActions.loginFailure(authenticate));

    effects.login$.subscribe(result => {
      expect(result).toEqual(authActions.loginFailure('Unhandle Error'));
      expect(authService.logIn).toHaveBeenCalledTimes(1);
    });
  });

  it(`should call the logOut service only once,`, () => {
    actions = new ReplaySubject(1);
    authService.logOut.and.returnValue(of());
    actions.next(authActions.logout());

    effects.logout$.subscribe(result => {
      expect(result).toEqual(authActions.notAuthenticated());
      expect(authService.logOut).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Auth Effects', () => {
  let effects: AuthEffects;
  let authService: any;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        MaterialModule,
      ],
      providers: [AngularFireAuth, AuthService, AuthEffects, provideMockActions(() => actions), SnackBarComponent],
    });

    effects = TestBed.get(AuthEffects);
    authService = TestBed.get(AuthService);
  });

  it(`should retrieves current user's info`, () => {
    actions = new ReplaySubject(1);
    const spy = spyOnProperty(authService, 'currentUser$').and.returnValue(of(user.user));
    actions.next(authActions.getUser(user));

    effects.getCurrentUser$.subscribe(result => {
      expect(result).toEqual(authActions.authenticated(user));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
