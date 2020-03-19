import { of } from 'rxjs';
import { action } from '@storybook/addon-actions';
import { ViewEncapsulation } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule, LocationStrategy } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '@app/shared/material';
import { user, products } from '@app/mockdata/data/models-data';

class RouterStub {
  url = 'products';
  navigate(commands: any[], extras?: any) {}
}

// This tempalte is required for avoing error:
// TypeError: Cannot read property 'subscribe' of undefined at new RouterLinkWithHref
const headerTemplate = `<mat-toolbar class="mat-header">
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
    </mat-menu>`;

export default {
  title: 'Header Component',
  excludeStories: /.*Data$/,
  decorators: [
    moduleMetadata({
      declarations: [HeaderComponent],
      imports: [BrowserAnimationsModule, CommonModule, MaterialModule, RouterModule],
      providers: [
        { provide: Router, useClass: RouterStub },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test' }),
          },
        },
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

export const NoAuthenticated = () => ({
  template: headerTemplate,
  props: {
    logOut: actionsData.signOut,
    doCheckout: actionsData.checkoutCart,
  },
});

export const JustAuthenticated = () => ({
  template: headerTemplate,
  props: {
    user: headerData.mockUser,
    cartTotal: 0,
    cartItems: [],
    logOut: actionsData.signOut,
    doCheckout: actionsData.checkoutCart,
  },
});

export const AuthenticatedAndItemsInCart = () => ({
  component: HeaderComponent,
  template: headerTemplate,
  encapsulation: ViewEncapsulation.None,

  props: {
    user: headerData.mockUser,
    cartTotal: headerData.mockCartTotal,
    cartItems: headerData.mockCartItems,
    logOut: actionsData.signOut,
    doCheckout: actionsData.checkoutCart,
  },
  // Styles in-line, issue with the backdropclass in mat-menu
  styles: [
    `
.mat-menu-item {
  min-height: 10vh;
  color: white;
  display: flex;
}

.menu-view {
  background: white;
  margin: 0;
  height: 7vh;
  width: auto;
}
`,
  ],
});
