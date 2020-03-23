import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { OrderSummaryComponent } from '@app/features/admin-checkout/summaries/order-summary/order-summary.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule],
  declarations: [OrderSummaryComponent],
  exports: [OrderSummaryComponent],
})
export class OrderSummaryModule {}
