import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { OrderListComponent } from '@app/features/admin-order/order-list/order-list.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, RouterModule],
  declarations: [OrderListComponent],
  exports: [OrderListComponent],
})
export class OrderListModule {}
