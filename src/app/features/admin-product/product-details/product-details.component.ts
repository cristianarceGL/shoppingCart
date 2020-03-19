import { Observable } from 'rxjs';
import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectorRef, ViewRef } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-product-details',
  template: `
    <mat-card class="mat-card" fxFlex="100%" fxLayout="row" fxLayout.lt-md="column" fxLayoutAlign="center center">
      <img mat-card-image [src]="selectedProduct.imgUrl" alt="Chocolate image" />
      <div class="displayed-item">
        <mat-card-header>
          <mat-card-title>{{ selectedProduct.title }}</mat-card-title>
          <mat-card-subtitle>
            {{ selectedProduct.price | currency }}
          </mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <div class="content">
            <div>
              <span class="stars-container stars-{{ selectedProduct.percentage }}">★★★★★</span>
            </div>
            <div>
              <p>{{ selectedProduct.description }}</p>
            </div>
            <div>
              <mat-label><strong>Quantity</strong></mat-label>
            </div>
            <div>
              <input type="text" class="text-area" [(ngModel)]="itemQuantity" maxlength="3" sc-number-only />
            </div>
            <div class="content-actions" fxLayoutAlign="space-between center">
              <button
                mat-raised-button
                color="primary"
                [ngStyle]="{ 'background-color': productAdded === true ? '#373A3C' : '#0275D8' }"
                (click)="toggleAddToCart()"
              >
                {{ productAdded ? 'Added!' : 'Add to Cart' }}
              </button>
              <button mat-raised-button color="accent" (click)="redirectToList('back')">Back</button>
            </div>
          </div>
        </mat-card-content>
      </div>
      <br />
    </mat-card>
  `,
  styles: [
    `
      mat-card.mat-card {
        box-shadow: 10px 10px 10px rgba(0, 0, 0, 0);
        display: flex;
        margin-left: auto;
        margin-right: auto;
        margin-top: 10vh;
      }

      mat-card.mat-card mat-card-content {
        margin: 0 16px;
        position: relative;
      }

      .content {
        padding: 10px auto;
      }

      .content div {
        margin: 20px 3px;
      }

      .mat-card-image {
        margin: 0 -16px 16px -16px;
        width: 250px;
      }

      p {
        color: #666666;
        font: 14px/18px Open Sans Regular, sans-serif;
        max-width: fit-content;
      }

      input {
        border-radius: 3px;
        width: 15%;
      }

      button[color='primary'] {
        margin-right: 1vw;
      }
    `,
  ],
})
export class ProductDetailsComponent implements OnInit {
  @Input() public product$: Observable<Product>;
  @Output() public backTo = new EventEmitter<string>();
  @Output() public productInCart = new EventEmitter<any>();

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
      this.productInCart.emit({ ...this.selectedProduct, quantity: this.itemQuantity });
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
