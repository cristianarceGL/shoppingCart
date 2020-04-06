import { Component, Input } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-order-summary',
  templateUrl: `./order-summary.component.html`,
  styleUrls: [`./order-summary.component.scss`],
})
export class OrderSummaryComponent {
  @Input() public shippingAmount: number;
  @Input() public cartItems: Product[];
  @Input() public cartSubtotalPrice: number;
}
