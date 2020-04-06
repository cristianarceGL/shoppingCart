import { createAction, props } from '@ngrx/store';

import { Product } from '@app/features/core/models/product.model';
import { Slide } from '@app/features/core/models/slide.model';

// Happy path
export const loadProducts = createAction('[Product/API] Load Products');
export const addProduct = createAction('[Product/API] Add Product', props<{ product: Product }>());
export const productActionSuccess = createAction('[Product/API] Product Action Success');

export const loadCarouselProducts = createAction('[Product/API] Load Carousel Products');
export const addCarouselProduct = createAction('[Product/API] Add Carousel Product', props<{ item: Slide }>());

// Un-Happy path
export const productActionFailure = createAction(
  '[Product/API] Product Action Failure',
  (errorMessage = 'Error in product') => ({
    payload: { errorMessage },
  })
);
