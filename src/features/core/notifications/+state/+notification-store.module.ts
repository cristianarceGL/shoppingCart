import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { NotificationEffects } from '@app/features/core/notifications/+state/+notification.effects';
import {
  notificationReducer,
  notificationFeatureKey,
} from '@app/features/core/notifications/+state/+notification.reducer';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    StoreModule.forFeature(notificationFeatureKey, notificationReducer),
    EffectsModule.forFeature([NotificationEffects]),
  ],
})
export class NotificationStoreModule {}
