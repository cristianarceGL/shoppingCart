import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { OrdertState } from '@app/features/admin-order/state/order.reducer';
import * as orderActions from '@app/features/admin-order/state/order.actions';

@Injectable({ providedIn: 'root' })
export class OrderActionsList {
  constructor(private store: Store<OrdertState>) {}
  public addToOrders(product: Product): void {
    this.store.dispatch(orderActions.addToOrders({ product }));
  }
  public removeFromOrder(productId: string): void {
    this.store.dispatch(orderActions.removeFromOrder({ productId }));
  }
  public orderCompleted(): void {
    this.store.dispatch(orderActions.orderCompleted());
  }
}
