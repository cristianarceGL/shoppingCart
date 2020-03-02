import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/shared.module';
import { ControlsModule } from '@app/shared/controls/controls.module';
import { RoutingStoreModule } from '@app/features/core/store/routing/routing-store.module';
import { AdminProductComponent } from '@app/features/admin-product/admin-product.component';
import { AdminProductRoutingModule } from '@app/features/admin-product/admin-product-routing.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  SharedModule,
  MaterialModule,
  RouterModule,
  AdminProductRoutingModule,
  ControlsModule,
  RoutingStoreModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AdminProductComponent],
})
export class AdminProductModule {}
