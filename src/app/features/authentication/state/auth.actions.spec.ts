import { Store } from '@ngrx/store';

import { authenticate, user } from '@app/mockdata/data/models-data';
import { AuthState } from '@app/features/authentication/state/auth.reducer';
import * as authActions from '@app/features/authentication/state/auth.actions';
import { AuthActionsList } from '@app/features/authentication/state/auth.actions.list';

describe('AuthListActions', () => {
  it('should dispatch login action', () => {
    const expectedAction = authActions.login(authenticate);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.login();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch logout action', () => {
    const expectedAction = authActions.logout();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.logout();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch getUser action', () => {
    const expectedAction = authActions.getUser(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.getUser();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch loginSuccess action', () => {
    const expectedAction = authActions.loginSuccess(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.loginSuccess();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch authenticated action', () => {
    const expectedAction = authActions.authenticated(user);
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.authenticated();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch notAuthenticated action', () => {
    const expectedAction = authActions.notAuthenticated();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.notAuthenticated();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch loginFailure action', () => {
    const expectedAction = authActions.loginFailure();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.loginFailure();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});
