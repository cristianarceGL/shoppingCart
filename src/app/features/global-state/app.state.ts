import { storeReset } from 'ngrx-store-reset';
import { ActionReducerMap, ActionReducer, MetaReducer } from '@ngrx/store';

import * as authActions from '@app/features/authentication/state/auth.actions';
import * as orderReducer from '@app/features/admin-order/state/order.reducer';
import * as authReducer from '@app/features/authentication/state/auth.reducer';
import * as productReducer from '@app/features/admin-product/state/product.reducer';

export interface ApplicationState {
  auth: authReducer.AuthState;
  product: productReducer.State;
  order: orderReducer.State;
}

export function defaultReducer<T>(state: T) {
  return state;
}

export const initialReducerMap = {
  auth: defaultReducer,
  product: defaultReducer,
  order: defaultReducer,
} as ActionReducerMap<ApplicationState>;

export function getInitialState() {
  return {
    auth: authReducer.initialState,
    product: productReducer.initialState,
    order: orderReducer.initialState,
  } as ApplicationState;
}

export function storeResetMetaReducer(reducer: ActionReducer<ApplicationState>): ActionReducer<ApplicationState> {
  return storeReset({ action: authActions.resetStates().type })(reducer);
}

export const metaReducers: MetaReducer<ApplicationState>[] = [storeResetMetaReducer];
