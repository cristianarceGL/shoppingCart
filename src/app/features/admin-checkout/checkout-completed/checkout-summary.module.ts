import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPrintModule } from 'ngx-print';

import { SharedModule } from '@app/shared/shared.module';
import { CheckoutCompletedComponent } from '@app/features/admin-checkout/checkout-completed/checkout-summary.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule, NgxPrintModule],
  declarations: [CheckoutCompletedComponent],
  exports: [CheckoutCompletedComponent],
})
export class CheckoutCompletedModule {}
