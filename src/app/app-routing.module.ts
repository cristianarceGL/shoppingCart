import { NgModule } from '@angular/core';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { canActivate, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectLoggedInToItems = redirectLoggedInTo(['products']);
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['auth']);

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: '@app/features/auth/auth.module#AuthModule', ...canActivate(redirectLoggedInToItems) },
  {
    path: 'products',
    loadChildren: () => import('@app/features/admin-product/admin-product.module').then(mod => mod.AdminProductModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
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
