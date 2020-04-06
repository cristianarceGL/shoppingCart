import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { ProductStoreModule } from '@app/features/admin-product/state';
import { AdminOrderModule } from '@app/features/admin-order/admin-order.module';
import { AdminProductComponent } from '@app/features/admin-product/admin-product.component';
import { ProductListModule } from '@app/features/admin-product/product-list/product-list.module';
import { AdminProductRoutingModule } from '@app/features/admin-product/admin-product-routing.module';
import { ProductDetailsModule } from '@app/features/admin-product/product-details/product-details.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ProductStoreModule,
  SharedModule,
  RouterModule,
  AdminProductRoutingModule,
  ProductListModule,
  ProductDetailsModule,
  AdminOrderModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AdminProductComponent],
})
export class AdminProductModule {}
