import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '@app/shared/shared.module';
import { NotificationStoreModule } from '@app/features/core/notifications/+state/+notification-store.module';

const modules = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  MaterialModule,
  ReactiveFormsModule,
  NotificationStoreModule,
];

@NgModule({
  imports: [...modules],
})
export class NotificationModule {}
