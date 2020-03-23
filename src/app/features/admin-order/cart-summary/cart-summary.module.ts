import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { CartSummaryComponent } from '@app/features/admin-order/cart-summary/cart-summary.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule],
  declarations: [CartSummaryComponent],
  exports: [CartSummaryComponent],
})
export class CartSummaryModule {}
