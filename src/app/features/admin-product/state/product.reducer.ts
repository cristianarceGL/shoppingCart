import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { Slide } from '@app/features/core/models/slide.model';
import { Product } from '@app/features/core/models/product.model';
import * as productActions from '@app/features/admin-product/state/product.actions';

export const productFeatureKey = 'product';

export interface ProductState extends EntityState<Product> {
  total: number;
}

export interface CarouselProductState extends EntityState<Slide> {
  total: number;
}

export interface State {
  msg: string;
  products: ProductState;
  carousel: CarouselProductState;
}

export const adapterProduct: EntityAdapter<Product> = createEntityAdapter<Product>();
export const adapterCarousel: EntityAdapter<Slide> = createEntityAdapter<Slide>();

const productInitialState: ProductState = adapterProduct.getInitialState({ total: 0 });
const carouselInitialState: CarouselProductState = adapterCarousel.getInitialState({ total: 0 });

export const initialState = {
  msg: 'Multiple entities in same state: Product & Carousel',
  products: productInitialState,
  carousel: carouselInitialState,
};

const reducer = createReducer(
  initialState,
  on(productActions.addProduct, (state, { product }) => {
    return { ...state, products: adapterProduct.addOne(product, state.products) };
  }),
  on(productActions.addCarouselProduct, (state, { item }) => {
    return {
      ...state,
      carousel: adapterCarousel.addOne(item, state.carousel),
    };
  })
);

export function productReducer(state: State = initialState, action: Action) {
  return reducer(state, action);
}

export const selectProductState = (state: State) => state.products;
export const selectCarouselState = (state: State) => state.carousel;

export const {
  selectIds: selectProductIds,
  selectEntities: selectProductEntities,
  selectAll: selectAllProducts,
  selectTotal: selectProductTotal,
} = adapterProduct.getSelectors();

export const {
  selectIds: selectCarouselIds,
  selectEntities: selectCarouselEntities,
  selectAll: selectAllCarousel,
  selectTotal: selectCarouselTotal,
} = adapterCarousel.getSelectors();
