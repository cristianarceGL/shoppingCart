import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Authenticate } from '@app/features/authentication/models';
import { login } from '@app/features/authentication/+state/+auth.actions';
import { AuthState } from '@app/features/authentication/+state/+auth.reducer';

@Component({
  selector: 'sc-auth',
  template: `
    <sc-login-form (loginFormSubmit)="login($event)" data-cy="auth-page"></sc-login-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(private store: Store<AuthState>) {}

  public login(authenticate: Authenticate): void {
    this.store.dispatch(login({ authenticate }));
  }
}
