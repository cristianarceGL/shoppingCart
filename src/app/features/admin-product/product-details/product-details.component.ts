import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, ViewRef } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-product-details',
  templateUrl: `./product-details.component.html`,
  styleUrls: [`./product-details.component.scss`],
})
export class ProductDetailsComponent implements OnInit {
  @Input() public product$: Observable<Product>;
  @Output() public backTo = new EventEmitter<string>();
  @Output() public productInCart = new EventEmitter<Product>();

  public selectedProduct: Product;
  public productAdded = false;
  public itemQuantity = '';

  constructor(private changeDetector: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.product$.subscribe(selectedProduct => {
      this.selectedProduct = selectedProduct;
    });
  }

  public redirectToList = _ => this.backTo.emit(null);

  public toggleAddToCart(): void {
    if (+this.itemQuantity > 0) {
      this.productAdded = true;
      this.productInCart.emit({ ...this.selectedProduct, quantity: +this.itemQuantity });
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
