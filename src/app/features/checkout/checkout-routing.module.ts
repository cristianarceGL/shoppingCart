import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckoutComponent } from '@app/features/checkout/checkout.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: CheckoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
})
export class CheckoutRoutingModule {}
