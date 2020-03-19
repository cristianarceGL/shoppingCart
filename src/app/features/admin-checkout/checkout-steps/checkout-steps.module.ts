import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { PlaceOrderModule } from '@app/features/admin-checkout/checkout-steps/place-order/place-order.module';
import { CheckoutStepsComponent } from '@app/features/admin-checkout/checkout-steps/checkout-steps.component';
import { ShippingInformationModule } from '@app/features/admin-checkout/checkout-steps/shipping-information/shipping-information.module';
import { BillingInformationModule } from '@app/features/admin-checkout/checkout-steps/billing-information/billing-information.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule,
    ShippingInformationModule,
    BillingInformationModule,
    PlaceOrderModule,
  ],
  declarations: [CheckoutStepsComponent],
  exports: [CheckoutStepsComponent],
})
export class CheckoutStepsModule {}
