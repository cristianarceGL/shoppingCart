import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sc-cart-summary',
  templateUrl: `./cart-summary.component.html`,
  styleUrls: [`./cart-summary.component.scss`],
})
export class CartSummaryComponent {
  @Input() public cartTotal: number;
  @Input() public cartTotalPrice: number;
  @Output() public toCheckout = new EventEmitter<boolean>();

  public redirectToCheckout = () => this.toCheckout.emit(true);
}
