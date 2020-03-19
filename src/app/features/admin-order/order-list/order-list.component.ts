import { Observable } from 'rxjs';
import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Component({
  selector: 'sc-order-list',
  template: `
    <mat-card
      *ngFor="let product of products$ | async; let i = index"
      [attr.data-cy]="'element-' + i"
      fxFlex="100%"
      fxLayout="column"
    >
      <div fxFlex="100%" fxLayout="row">
        <a (click)="removeItem(product.id)" class="remove-element"></a>
        <mat-card-content [class.mat-elevation-z8]="true">
          <img mat-card-image [src]="product.imgUrl" alt="Photo of a Product" />
        </mat-card-content>
        <mat-card-header>
          <mat-card-title>{{ product.title }}</mat-card-title>
          <mat-card-subtitle>{{ product.price | currency }} * In stock</mat-card-subtitle>
          <mat-card-subtitle>
            <button mat-raised-button (click)="updateQuantity(product, 'substract')">-</button>
            <button mat-raised-button disabled>{{ product.quantity }}</button>
            <button mat-raised-button (click)="updateQuantity(product, 'add')">+</button>
          </mat-card-subtitle>
        </mat-card-header>
      </div>
      <div fxFlex="100%" fxLayout="row">
        <mat-divider></mat-divider>
        <mat-card-content class="reserve-space"></mat-card-content>
        <mat-card-header>
          <mat-card-title>
            Total ({{ product.quantity }})<span class="total-display">{{
              product.price * product.quantity | currency
            }}</span>
          </mat-card-title>
        </mat-card-header>
      </div>
    </mat-card>
  `,
  styles: [
    `
      .mat-card-image:last-child {
        margin: 0;
        width: 10vw;
      }

      .reserve-space {
        width: 23%;
      }

      .total-display {
        position: absolute;
        right: 5px;
      }

      .remove-element {
        color: #777;
        font: 20px/100% arial, sans-serif;
        font-size: larger;
        font-weight: 900;
        position: absolute;
        right: 5px;
        text-decoration: none;
        text-shadow: 0 1px 0 #fff;
        top: 5px;
      }

      .remove-element:after {
        content: 'x';
      }
    `,
  ],
})
export class OrderListComponent implements OnDestroy {
  constructor(private subService: SubscriptionService) {}
  @Input() public products$: Observable<Product[]>;
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
