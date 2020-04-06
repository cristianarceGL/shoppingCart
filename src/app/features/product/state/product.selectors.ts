import { createSelector, createFeatureSelector } from '@ngrx/store';

import { Product } from '@app/features/core/models/product.model';
import * as fromReducer from '@app/features/product/state/product.reducer';

export interface ProductState {
  example: fromReducer.State;
}

export const selectRouteState = createFeatureSelector<fromReducer.State>(fromReducer.productFeatureKey);

export const selectProductState = createSelector(
  selectRouteState,
  fromReducer.selectProductState
);
export const selectCarouselState = createSelector(
  selectRouteState,
  fromReducer.selectCarouselState
);

export const selectAllCarousel = createSelector(
  selectCarouselState,
  fromReducer.selectAllCarousel
);

export const selectProductRoutesIds = createSelector(
  selectProductState,
  fromReducer.selectProductIds
);
export const selectProductEntities = createSelector(
  selectProductState,
  fromReducer.selectProductEntities
);
export const selectAllProducts = createSelector(
  selectProductState,
  fromReducer.selectAllProducts
);
export const selectProductRoutesTotal = createSelector(
  selectProductState,
  fromReducer.selectProductTotal
);

// Custom selectors
const findProductById = (allProducts: Product[], productId: string) => {
  return allProducts.find(product => product.id === productId) || null;
};

export const getProductSelected = createSelector(
  selectAllProducts,
  (allProducts, props) => findProductById(allProducts, props.productId)
);
