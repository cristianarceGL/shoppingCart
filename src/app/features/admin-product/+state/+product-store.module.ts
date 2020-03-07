import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { ProductEffects } from '@app/features/admin-product/+state/+product.effects';
import { productFeatureKey, productReducer } from '@app/features/admin-product/+state/+product.reducer';
import { NotificationStoreModule } from '@app/features/core/notifications/+state/+notification-store.module';

@NgModule({
  imports: [
    CommonModule,
    NotificationStoreModule,
    StoreModule.forFeature(productFeatureKey, productReducer),
    EffectsModule.forFeature([ProductEffects]),
  ],
  providers: [ProductEffects],
})
export class ProductStoreModule {}
