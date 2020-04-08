import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Component({
  selector: 'sc-order-list',
  templateUrl: `./order-list.component.html`,
  styleUrls: [`./order-list.component.scss`],
})
export class OrderListComponent implements OnDestroy {
  constructor(private subService: SubscriptionService) {}
  @Input() public products: Product[];
  @Output() public productToRemove = new EventEmitter<string>();
  @Output() public productToUpdate = new EventEmitter<Product>();

  public ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  public removeItem = (productId: string) => this.productToRemove.emit(productId);

  public updateQuantity(product: Product, operation: string) {
    const copyProduct = { ...product };
    const newQuantity = operation === 'add' ? ++copyProduct.quantity : --copyProduct.quantity;

    if (newQuantity > 0) {
      this.productToUpdate.emit({ ...copyProduct, quantity: newQuantity });
    }
  }
}
