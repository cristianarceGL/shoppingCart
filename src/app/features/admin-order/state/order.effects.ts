import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as orderActions from '@app/features/admin-order/state/order.actions';

@Injectable()
export class OrderEffects {
  constructor(private actions$: Actions) {}

  public loadOrders$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(orderActions.loadOrders),
      map(_ => ({
        type: '[Order/API] Load Orders',
      }))
    )
  );

  public addToOrder$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderActions.addToOrders),
        map(action => ({
          type: '[Order/API] Add To Order',
          products: action.product,
        }))
      ),
    { dispatch: false }
  );

  public removeFromOrder$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(orderActions.removeFromOrder),
        map(productId => ({
          type: '[Order/API] Remove From Order',
          productId,
        }))
      ),
    { dispatch: false }
  );
}
