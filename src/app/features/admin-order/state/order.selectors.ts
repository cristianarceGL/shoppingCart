import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromReducer from '@app/features/admin-order/state/order.reducer';

export const selectRouteState = createFeatureSelector<fromReducer.State>(fromReducer.orderFeatureKey);

export const selectOrderState = createSelector(
  selectRouteState,
  fromReducer.selectOrdersState
);

export const selectAllOrders = createSelector(
  selectOrderState,
  fromReducer.selectAllOrders
);

// Custom selectors
export const getCartTotal = createSelector(
  selectAllOrders,
  allOrders => allOrders.reduce((sum, current) => sum + +current.quantity, 0)
);

export const getCartTotalPrice = createSelector(
  selectAllOrders,
  allOrders => allOrders.reduce((sum, current) => sum + +current.quantity * +current.price, 0)
);
