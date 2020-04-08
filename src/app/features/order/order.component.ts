import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { OrderActions, OrderSelectors } from '@app/features/order/state';

@Component({
  selector: 'sc-order',
  templateUrl: `./order.component.html`,
  styleUrls: [`./order.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderComponent implements OnInit, OnDestroy {
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
