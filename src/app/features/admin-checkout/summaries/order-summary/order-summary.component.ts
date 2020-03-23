import { Component, Input } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-order-summary',
  template: `
    <mat-card class="mat-card">
      <mat-card-title> Order Summary <span routerLink="/orders" style="color: #0275D8">Edit</span> </mat-card-title>
      <mat-divider></mat-divider>
      <div *ngFor="let item of cartItems">
        <br />
        <mat-card-title>
          <img mat-card-image [src]="item.imgUrl" /><span>{{ item.title }}</span>
        </mat-card-title>
        <mat-card-title>
          QTY: {{ item.quantity }} <span>{{ item.quantity * item.price | currency }}</span>
        </mat-card-title>
        <mat-divider></mat-divider>
      </div>
      <br />
      <mat-card-title>
        Subtotal <span>{{ +cartSubtotalPrice | currency }}</span>
      </mat-card-title>
      <mat-card-title>
        Shipping <span>{{ shippingAmount | currency }}</span>
      </mat-card-title>
      <mat-card-title> Tax <span>-</span> </mat-card-title>
    </mat-card>
    <mat-card class="order-total">
      <mat-card-title>
        Order Total <span>{{ +cartSubtotalPrice + +shippingAmount | currency }}</span>
      </mat-card-title>
    </mat-card>
  `,
  styles: [
    `
      .mat-card {
        border-radius: 4px 4px 0 0;
      }

      mat-card-title {
        place-content: center space-between;
        align-items: center;
        flex-direction: row;
        box-sizing: border-box;
        display: flex;
      }

      .order-total {
        background-color: #0275d8;
        color: white;
        border-radius: 0 0 4px 4px;
        margin-bottom: unset;
        margin-top: -2vh;
      }

      .mat-card-image {
        margin: 0;
        width: 25%;
      }
    `,
  ],
})
export class OrderSummaryComponent {
  @Input() public shippingAmount: number;
  @Input() public cartItems: Product[];
  @Input() public cartSubtotalPrice: number;
}
