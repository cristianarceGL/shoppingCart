import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { authenticate, user } from '@app/mockdata/data/models-data';
import { AuthState } from '@app/features/authentication/state/auth.reducer';
import * as authActions from '@app/features/authentication/state/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthActionsList {
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
  public resetStates(): void {
    this.store.dispatch(authActions.resetStates());
  }
}
