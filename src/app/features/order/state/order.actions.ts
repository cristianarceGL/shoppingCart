import { createAction, props } from '@ngrx/store';

import { Product } from '@app/features/core/models/product.model';

// Happy path
export const loadOrders = createAction('[Order/API] Load Orders');
export const addToOrders = createAction('[Order/API] Add To Order', props<{ product: Product }>());
export const removeFromOrder = createAction('[Order/API] Remove From Order', props<{ productId: string }>());
export const orderCompleted = createAction('[Order/API] Order Completed');
export const orderSuccess = createAction('[Order/API] Order Action Success');

// Un-Happy path
export const orderFailure = createAction(
  '[Order/API] Order Action Failure',
  (errorMessage = 'Error in product order') => ({
    payload: { errorMessage },
  })
);
