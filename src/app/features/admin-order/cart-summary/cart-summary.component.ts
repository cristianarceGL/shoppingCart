import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sc-cart-summary',
  template: `
    <mat-card>
      <mat-card-title fxLayoutAlign="space-between center">
        Cart Summary <span style="color: rgba(0, 0, 0, 0.54);">{{ +cartTotal }} items</span>
      </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title fxLayoutAlign="space-between center">
        Subtotal <span>{{ +cartTotalPrice | currency }}</span>
      </mat-card-title>
      <mat-card-title fxLayoutAlign="space-between center"> Shipping <span>-</span> </mat-card-title>
      <mat-card-title fxLayoutAlign="space-between center"> Tax <span>-</span> </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title fxLayoutAlign="space-between center" style="word-wrap: normal;">
        Estimated Total <span>{{ +cartTotalPrice | currency }}</span>
      </mat-card-title>
      <br />
      <button mat-raised-button color="primary" (click)="redirectToCheckout()" data-cy="order-checkout">
        Checkout
      </button>
    </mat-card>
  `,
})
export class CartSummaryComponent {
  @Input() public cartTotal: number;
  @Input() public cartTotalPrice: number;
  @Output() public toCheckout = new EventEmitter<boolean>();

  public redirectToCheckout = () => this.toCheckout.emit(true);
}
