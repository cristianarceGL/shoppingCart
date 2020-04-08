import { Injectable } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CheckoutSummaryService {
  public getInvoiceTotal(products: Product[]): number {
    let invoiceTotal = 0;
    invoiceTotal = products.reduce((sum, current) => sum + +current.quantity * +current.price, 0);
    return invoiceTotal;
  }
}
