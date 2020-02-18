import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminProductComponent } from './admin-product.component';

export const routes: Routes = [{ path: '', component: AdminProductComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AdminProductRoutingModule {}
