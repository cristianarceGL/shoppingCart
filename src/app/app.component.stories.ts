import { of } from 'rxjs';
import { Store } from '@ngrx/store';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule, LocationStrategy } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { mockedState } from '@app/mockdata/data/models-data';
import { user, products } from '@app/mockdata/data/models-data';
import { FooterModule } from './features/core/layout/footer/footer.module';
import { LogInFormModule } from './features/authentication/login-form/login-form.module';

const initialState = mockedState;

class RouterStub {
  url = 'products';
  navigate(commands: any[], extras?: any) {}
}

// This tempalte is required for avoing error:
// TypeError: Cannot read property 'subscribe' of undefined at new RouterLinkWithHref
const layoutTemplate = `<mat-toolbar class="mat-header">
      <a><img src="assets/GL-Logo.png"/></a>
      <span class="nav-tool-items">
        <a *ngIf="cartItems?.length > 0; else noMenu" mat-button [matMenuTriggerFor]="menu" data-cy="cart-items"
          >Cart({{ +cartTotal }})</a
        >
        <ng-template #noMenu>
          <a *ngIf="user" mat-button>Cart({{ +cartTotal }})</a>
        </ng-template>
        <a *ngIf="user" mat-button (click)="logOut()" class="logout">Log out</a>
      </span>
    </mat-toolbar>
    <mat-menu #menu="matMenu" backdropClass="customize">
      <div *ngFor="let item of cartItems" mat-menu-item>
        <img class="menu-view" [src]="item.imgUrl" alt="Chocolate image" />
        <div class="menu-labels">
          <p>{{ item.title }}</p>
          <p>{{ item.quantity }} x {{ item.price | currency }}</p>
        </div>
      </div>
      <div class="button-space">
        <button mat-raised-button color="primary" (click)="doCheckout()" data-cy="do-checkout">Checkout</button>
      </div>
    </mat-menu>
    <br />
    <sc-login-form (loginFormSubmit)="login($event)" data-cy="auth-page"></sc-login-form>
    <sc-footer></sc-footer>`;

export default {
  title: 'App Component',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      imports: [
        BrowserAnimationsModule,
        CommonModule,
        MaterialModule,
        RouterModule,
        LogInFormModule,
        FooterModule,
        RouterModule,
      ],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
          },
        },
        { provide: Store, useValue: { initialState } },

        LocationStrategy,
      ],
    }),
  ],
};

export const actionsData = {
  signOut: action('Sign Out action!'),
  checkoutCart: action('Check Out action!'),
};

export const headerData = {
  mockUser: user.user,
  mockCartTotal: 3,
  mockCartItems: [products[0], products[1], products[2]],
};

export const Default = () => ({
  template: layoutTemplate,
  props: {
    logOut: actionsData.signOut,
    checkoutCart: actionsData.checkoutCart,
  },
  styles: [
    `

`,
  ],
});
