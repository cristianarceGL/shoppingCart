import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminCheckoutComponent } from '@app/features/admin-checkout/admin-checkout.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: AdminCheckoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class AdminOrderRoutingModule {}
