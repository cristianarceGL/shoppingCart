import { Component, Output, EventEmitter, Input, ChangeDetectorRef, ViewRef } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-product-details',
  templateUrl: `./product-details.component.html`,
  styleUrls: [`./product-details.component.scss`],
})
export class ProductDetailsComponent {
  @Input() public productSelected: Product;
  @Output() public backTo = new EventEmitter<string>();
  @Output() public productInCart = new EventEmitter<Product>();

  public productAdded = false;
  public itemQuantity = '';

  constructor(private changeDetector: ChangeDetectorRef) {}

  public redirectToList = _ => this.backTo.emit(null);

  public toggleAddToCart(): void {
    if (+this.itemQuantity > 0) {
      this.productAdded = true;
      this.productInCart.emit({ ...this.productSelected, quantity: +this.itemQuantity });
      this.itemQuantity = '';
      setTimeout(() => {
        if (this.changeDetector && !(this.changeDetector as ViewRef).destroyed) {
          this.productAdded = false;
          this.changeDetector.detectChanges();
        }
      }, 1500);
    }
  }
}
