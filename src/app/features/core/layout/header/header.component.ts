import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

import { User } from '@app/features/authentication/models/user';
import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-header',
  template: `
    <mat-toolbar class="mat-header">
      <a routerLink="/products"><img src="assets/GL-Logo.png"/></a>
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
  `,
  styleUrls: [`./header.component.scss`],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() public user: User;
  @Input() public cartTotal = 0;
  @Input() public cartItems: Product[] | null;

  @Output() public signOut = new EventEmitter<void>();
  @Output() public checkoutCart = new EventEmitter<void>();

  public doCheckout(): void {
    this.checkoutCart.emit();
  }

  public logOut(): void {
    this.signOut.emit();
  }
}
