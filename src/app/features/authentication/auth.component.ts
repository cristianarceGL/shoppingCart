import { Store } from '@ngrx/store';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Authenticate } from '@app/features/authentication/models';
import { login } from '@app/features/authentication/state/auth.actions';
import { AuthState } from '@app/features/authentication/state/auth.reducer';

@Component({
  selector: 'sc-auth',
  templateUrl: `./auth.component.html`,
  styleUrls: [`./auth.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {
  constructor(private store: Store<AuthState>) {}

  public login(authenticate: Authenticate): void {
    this.store.dispatch(login({ authenticate }));
  }
}
