import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/shared.module';
import { ControlsModule } from '@app/shared/controls/controls.module';
import { AdminProductRoutingModule } from './admin-product-routing.module';
import { AdminProductComponent } from './admin-product.component';
import { RoutingStoreModule } from '../core/store/routing';
import { ProductListModule } from './product-list/product-list.module';
import { ProductStoreModule } from './+state';
import { ProductDetailsModule } from './product-details/product-details.module';

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  ProductStoreModule,
  SharedModule,
  MaterialModule,
  RouterModule,
  AdminProductRoutingModule,
  ProductListModule,
  ProductDetailsModule,
  ControlsModule,
  RoutingStoreModule,
];

@NgModule({
  imports: [...modules],
  declarations: [AdminProductComponent],
})
export class AdminProductModule {}
