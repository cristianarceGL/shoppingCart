import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { ProductDetailsComponent } from '@app/features/admin-product/product-details/product-details.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule],
  declarations: [ProductDetailsComponent],
  exports: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
