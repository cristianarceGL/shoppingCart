import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { PaymentInformationComponent } from '@app/features/checkout/checkout-steps/payment-information/payment-information.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule],
  declarations: [PaymentInformationComponent],
  exports: [PaymentInformationComponent],
})
export class PaymentInformationModule {}
