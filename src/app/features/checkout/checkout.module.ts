import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CheckoutComponent } from '@app/features/checkout/checkout.component';
import { CheckoutRoutingModule } from '@app/features/checkout/checkout-routing.module';
import { CheckoutStepsModule } from '@app/features/checkout/checkout-steps/checkout-steps.module';
import { StepSummaryModule } from '@app/features/checkout/summaries/step-summary/step-summary.module';
import { OrderSummaryModule } from '@app/features/checkout/summaries/order-summary/order-summary.module';
import { CheckoutCompletedModule } from '@app/features/checkout/checkout-completed/checkout-summary.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  RouterModule,
  CheckoutRoutingModule,
  OrderSummaryModule,
  CheckoutCompletedModule,
  CheckoutStepsModule,
  StepSummaryModule,
];

@NgModule({
  imports: [...modules],
  declarations: [CheckoutComponent],
})
export class CheckoutModule {}
