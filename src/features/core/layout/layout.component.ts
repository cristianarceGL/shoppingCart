import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from '@app/features/auth/models';
import { Component, OnInit } from '@angular/core';

import { AuthReducer, AuthSelectors, AuthActions } from '@app/features/auth/+state';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  user$: Observable<User | null>;

  constructor(private store: Store<AuthReducer.AuthState>) {}

  public ngOnInit(): void {
    this.store.dispatch(AuthActions.getUser({}));
    this.user$ = this.store.select(AuthSelectors.getUser);
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
