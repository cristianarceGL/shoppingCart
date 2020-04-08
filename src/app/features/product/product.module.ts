import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { ProductStoreModule } from '@app/features/product/state';
import { OrderModule } from '@app/features/order/order.module';
import { ProductComponent } from '@app/features/product/product.component';
import { ProductListModule } from '@app/features/product/product-list/product-list.module';
import { ProductRoutingModule } from '@app/features/product/product-routing.module';
import { ProductDetailsModule } from '@app/features/product/product-details/product-details.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ProductStoreModule,
  SharedModule,
  RouterModule,
  ProductRoutingModule,
  ProductListModule,
  ProductDetailsModule,
  OrderModule,
];

@NgModule({
  imports: [...modules],
  declarations: [ProductComponent],
})
export class ProductModule {}
