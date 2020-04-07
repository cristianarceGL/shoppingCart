import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { ProductEffects } from '@app/features/admin-product/state/product.effects';
import { productFeatureKey, productReducer } from '@app/features/admin-product/state/product.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductEffects],
})
export class ProductStoreModule {}
