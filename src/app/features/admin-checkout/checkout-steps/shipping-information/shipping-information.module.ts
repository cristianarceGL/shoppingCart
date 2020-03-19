import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CheckoutInformationModule } from '@app/features/admin-checkout/checkout-steps/checkout-information/checkout-information.module';
// tslint:disable-next-line: max-line-length
import { ShippingInformationComponent } from '@app/features/admin-checkout/checkout-steps/shipping-information/shipping-information.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, CheckoutInformationModule],
  declarations: [ShippingInformationComponent],
  exports: [ShippingInformationComponent],
})
export class ShippingInformationModule {}
