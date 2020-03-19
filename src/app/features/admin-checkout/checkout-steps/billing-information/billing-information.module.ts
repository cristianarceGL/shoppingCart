import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CheckoutInformationModule } from '@app/features/admin-checkout/checkout-steps/checkout-information/checkout-information.module';
import { BillingInformationComponent } from '@app/features/admin-checkout/checkout-steps/billing-information/billing-information.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, CheckoutInformationModule],
  declarations: [BillingInformationComponent],
  exports: [BillingInformationComponent],
})
export class BillilngInformationModule {}
