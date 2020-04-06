import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { PaymentInformationModule } from '@app/features/checkout/checkout-steps/payment-information/payment-information.module';
// tslint:disable-next-line: max-line-length
import { CheckoutInformationComponent } from '@app/features/checkout/checkout-steps/checkout-information/checkout-information.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, PaymentInformationModule],
  declarations: [CheckoutInformationComponent],
  exports: [CheckoutInformationComponent],
})
export class CheckoutInformationModule {}
