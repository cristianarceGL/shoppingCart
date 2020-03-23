import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminOrderComponent } from './admin-order.component';

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
