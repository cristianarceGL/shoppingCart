import { Component, Input, OnInit } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-checkout-completed',
  templateUrl: `./checkout-summary.component.html`,
  styleUrls: [`./checkout-summary.component.scss`],
})
export class CheckoutCompletedComponent implements OnInit {
  @Input() public shippingSummary: ShippingSummary;
  @Input() public billingSummary: BillingSummary;
  @Input() public paymentSummary: PaymentSummary;
  @Input() public products: Product[];
  @Input() public shippingAmount: number;

  public previewInvoice = false;
  public invoiceNumber = 0;
  public purchaseDate = new Date();
  public dueDate = new Date().setMonth(new Date().getMonth() + 1);

  public ngOnInit(): void {
    this.invoiceNumber = Math.floor(Math.random() * (99999999 - 10000000));
  }

  public getInvoiceTotal(): number {
    let invoiceTotal = 0;
    invoiceTotal = this.products.reduce((sum, current) => sum + +current.quantity * +current.price, 0);
    invoiceTotal = invoiceTotal + this.shippingAmount;
    return invoiceTotal;
  }

  public previewReceipt(): void {
    this.previewInvoice = true;
  }
}
