import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { OrderActions, OrderSelectors } from '@app/features/admin-order/+state';

@Component({
  selector: 'sc-admin-order',
  template: `
    <div data-cy="orders-page">
      <br />
      <a mat-button routerLink="/products" color="primary">&lt; Continue Shopping</a>
      <h6 class="h6">Shopping Cart</h6>
      <br />
      <div
        *ngIf="cartTotal$ | async; else showNoItems"
        fxLayout="row wrap"
        fxLayout.lt-sm="column"
        fxLayoutGap="32px"
        fxLayoutAlign="center"
      >
        <sc-order-list
          fxLayout="column"
          fxFlex="0 1 calc(75% - 32px)"
          fxFlex.lt-sm="100%"
          class="order-list"
          [products$]="cartItems$"
          (productToRemove)="removeItem($event)"
          (productToUpdate)="updateItem($event)"
        >
        </sc-order-list>
        <sc-cart-summary
          fxFlex="0 1 calc(25% - 32px)"
          fxFlex.lt-sm="100%"
          class="cart-summary"
          [cartTotal]="cartTotal$ | async"
          [cartTotalPrice]="cartTotalPrice$ | async"
          (toCheckout)="redirectToCheckout()"
        >
        </sc-cart-summary>
      </div>
      <br /><br /><br />
      <ng-template #showNoItems>
        <div style="text-align: center;">
          <h4>No items added to your cart</h4>
          <h6>Please go back to product list</h6>
        </div>
      </ng-template>
    </div>
  `,
  styles: [
    `
      .h6 {
        font-size: xx-large;
        font-weight: bolder;
        padding: 0 16px;
      }

      .order-summary {
        text-align: center;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public products$: Observable<Product[] | null>;
  public cartItems$: Observable<Product[] | null>;
  public cartTotal$: Observable<number | null>;
  public cartTotalPrice$: Observable<number | null>;

  constructor(private applicationState: Store<ApplicationState>, public router: Router) {}

  public ngOnInit(): void {
    this.cartItems$ = this.applicationState.select(OrderSelectors.selectAllOrders);
    this.cartTotal$ = this.applicationState.select(OrderSelectors.getCartTotal);
    this.cartTotalPrice$ = this.applicationState.select(OrderSelectors.getCartTotalPrice);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public removeItem(productId: string): void {
    this.applicationState.dispatch(OrderActions.removeFromOrder({ productId }));
  }

  public updateItem(product: Product): void {
    this.applicationState.dispatch(OrderActions.addToOrders({ product }));
  }

  public redirectToCheckout(): void {
    this.router.navigate([`checkouts`]);
  }
}
