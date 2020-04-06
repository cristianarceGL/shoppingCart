import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Product } from '@app/features/core/models/product.model';
import * as orderActions from '@app/features/order/state/order.actions';

export const orderFeatureKey = 'order';

export interface OrdertState extends EntityState<Product> {
  total: number;
}

export interface State {
  orders: OrdertState;
}

export const adapterOrder: EntityAdapter<Product> = createEntityAdapter<Product>();

const productInitialState: OrdertState = adapterOrder.getInitialState({ total: 0 });

export const initialState = {
  orders: productInitialState,
};

const reducer = createReducer(
  initialState,
  on(orderActions.addToOrders, (state, { product }) => {
    return { ...state, orders: adapterOrder.upsertOne(product, state.orders) };
  }),
  on(orderActions.removeFromOrder, (state, { productId }) => {
    return { ...state, orders: adapterOrder.removeOne(productId, state.orders) };
  }),
  on(orderActions.orderCompleted, state => {
    return { ...state, orders: adapterOrder.removeAll(state.orders) };
  })
);

export function orderReducer(state: State = initialState, action: Action) {
  return reducer(state, action);
}

export const selectOrdersState = (state: State) => state.orders;

export const {
  selectIds: selectOrderIds,
  selectEntities: selectOrderEntities,
  selectAll: selectAllOrders,
  selectTotal: selectOrderTotal,
} = adapterOrder.getSelectors();
