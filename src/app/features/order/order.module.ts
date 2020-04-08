import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { OrderComponent } from '@app/features/order/order.component';
import { OrderStoreModule } from '@app/features/order/state/order-store.module';
import { OrderListModule } from '@app/features/order/order-list/order-list.module';
import { OrderRoutingModule } from '@app/features/order/order-routing.module';
import { CartSummaryModule } from '@app/features/order/cart-summary/cart-summary.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  OrderStoreModule,
  SharedModule,
  RouterModule,
  OrderRoutingModule,
  OrderListModule,
  CartSummaryModule,
];

@NgModule({
  imports: [...modules],
  declarations: [OrderComponent],
})
export class OrderModule {}
