import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { OrderEffects } from '@app/features/admin-order/+state/+order.effects';
import { orderFeatureKey, orderReducer } from '@app/features/admin-order/+state/+order.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(orderFeatureKey, orderReducer),
    EffectsModule.forFeature([OrderEffects]),
  ],
  providers: [OrderEffects],
})
export class OrderStoreModule {}
