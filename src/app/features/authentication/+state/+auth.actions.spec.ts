import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { AuthState } from '@app/features/authentication/+state/+auth.reducer';
import * as authActions from '@app/features/authentication/+state/+auth.actions';
import { authenticate, user } from '@app/mockdata/data/models-data';

@Injectable({ providedIn: 'root' })
export class AuthListActions {
  constructor(private store: Store<AuthState>) {}

  public login(): void {
    this.store.dispatch(authActions.login(authenticate));
  }

  public logout(): void {
    this.store.dispatch(authActions.logout());
  }

  public getUser(): void {
    this.store.dispatch(authActions.getUser(user));
  }

  public loginSuccess(): void {
    this.store.dispatch(authActions.loginSuccess(user));
  }

  public authenticated(): void {
    this.store.dispatch(authActions.authenticated(user));
  }

  public notAuthenticated(): void {
    this.store.dispatch(authActions.notAuthenticated());
  }

  public loginFailure(): void {
    this.store.dispatch(authActions.loginFailure());
  }
}

describe('AuthListActions', () => {
  it('should dispatch login action', () => {
    const expectedAction = authActions.login(authenticate);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.login();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch logout action', () => {
    const expectedAction = authActions.logout();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.logout();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch getUser action', () => {
    const expectedAction = authActions.getUser(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.getUser();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch loginSuccess action', () => {
    const expectedAction = authActions.loginSuccess(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.loginSuccess();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch authenticated action', () => {
    const expectedAction = authActions.authenticated(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.authenticated();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch notAuthenticated action', () => {
    const expectedAction = authActions.notAuthenticated();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.notAuthenticated();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch loginFailure action', () => {
    const expectedAction = authActions.loginFailure();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthListActions(store);

    authListActions.loginFailure();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
