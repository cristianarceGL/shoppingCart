import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { RoutingStoreModule } from '@app/features/core/store/routing';
import { AdminOrderComponent } from '@app/features/admin-order/admin-order.component';
import { OrderStoreModule } from '@app/features/admin-order/+state/+order-store.module';
import { OrderListModule } from '@app/features/admin-order/order-list/order-list.module';
import { AdminOrderRoutingModule } from '@app/features/admin-order/admin-order-routing.module';
import { CartSummaryModule } from '@app/features/admin-order/cart-summary/cart-summary.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  OrderStoreModule,
  SharedModule,
  RouterModule,
  AdminOrderRoutingModule,
  RoutingStoreModule,
  OrderListModule,
  CartSummaryModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AdminOrderComponent],
})
export class AdminOrderModule {}
