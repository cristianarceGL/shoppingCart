import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrderComponent } from '@app/features/admin-checkout/admin-checkout.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminOrderComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AdminOrderRoutingModule {}
