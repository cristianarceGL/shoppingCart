import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { User } from '@app/features/authentication/models';
import { Product } from '@app/features/core/models/product.model';
import { OrderSelectors } from '@app/features/admin-order/+state';
import { ApplicationState } from '@app/features/global-state/app.state';
import { AuthSelectors, AuthActions } from '@app/features/authentication/+state';

@Component({
  selector: 'sc-layout',
  template: `
    <sc-header
      [user]="user$ | async"
      [cartTotal]="cartTotal$ | async"
      [cartItems]="cartItems$ | async"
      (checkoutCart)="checkoutCart()"
      (signOut)="logOut()"
    ></sc-header>
    <br />
    <ng-content></ng-content>
    <sc-footer></sc-footer>
  `,
  styles: [''],
})
export class LayoutComponent implements OnInit {
  public user$: Observable<User | null>;
  public cartItems$: Observable<Product[] | null>;
  public cartTotal$: Observable<number | null>;

  constructor(private applicationState: Store<ApplicationState>, private router: Router) {}

  public ngOnInit(): void {
    this.applicationState.dispatch(AuthActions.getUser({}));
    this.user$ = this.applicationState.select(AuthSelectors.getUser);
    this.cartTotal$ = this.applicationState.select(OrderSelectors.getCartTotal);
    this.cartItems$ = this.applicationState.select(OrderSelectors.selectAllOrders);
  }

  public checkoutCart(): void {
    this.router.navigate(['orders']);
  }

  public logOut(): void {
    this.applicationState.dispatch(AuthActions.logout());
    this.applicationState.dispatch(AuthActions.resetStates());
  }
}
