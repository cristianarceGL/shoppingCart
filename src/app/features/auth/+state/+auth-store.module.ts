import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { AuthEffects } from '@app/features/auth/+state/+auth.effects';
import { authReducer, authFeatureKey } from '@app/features/auth/+state/+auth.reducer';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature(authFeatureKey, authReducer), EffectsModule.forFeature([AuthEffects])],
  providers: [AuthEffects],
})
export class AuthStoreModule {}
