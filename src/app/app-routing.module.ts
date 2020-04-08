import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { canActivate, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

import { OrderCheckoutGuard } from '@app/features/core/guards/order-checkout.guard';

const redirectLoggedInToProducts = redirectLoggedInTo(['products']);
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('@app/features/authentication/auth.module').then(mod => mod.AuthModule),
    ...canActivate(redirectLoggedInToProducts),
  },
  {
    path: 'products',
    loadChildren: () => import('@app/features/product/product.module').then(mod => mod.ProductModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'orders',
    loadChildren: () => import('@app/features/order/order.module').then(mod => mod.OrderModule),
    canActivate: [OrderCheckoutGuard],
  },
  {
    path: 'checkouts',
    loadChildren: () => import('@app/features/checkout/checkout.module').then(mod => mod.CheckoutModule),
    canActivate: [OrderCheckoutGuard],
  },
  { path: '**', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
