import { Observable } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-place-order',
  template: `
    <mat-card *ngFor="let product of products$ | async; let i = index" [attr.data-cy]="'element-' + i">
      <div fxLayout="row">
        <mat-card-content [class.mat-elevation-z8]="true">
          <img mat-card-image [src]="product.imgUrl" alt="Photo of a Product" />
        </mat-card-content>
        <div fxLayout="row" fxFlex="100%" fxLayoutAlign="space-between start">
          <mat-card-header>
            <mat-card-title>{{ product.title }}</mat-card-title>
            <mat-card-subtitle>{{ product.price | currency }} * In stock</mat-card-subtitle>
          </mat-card-header>
          <mat-card-header>
            <mat-card-title>QTY: {{ product.quantity }}</mat-card-title>
          </mat-card-header>
          <mat-card-header>
            <mat-card-title>{{ product.price * product.quantity | currency }}</mat-card-title>
          </mat-card-header>
        </div>
      </div>
    </mat-card>
    <button type="button" mat-raised-button color="primary" (click)="submit()" style="float: right;">
      Place Order
    </button>
  `,
  styles: [
    `
      .mat-card-image:last-child {
        margin: 0;
        width: 10vw;
      }
    `,
  ],
})
export class PlaceOrderComponent {
  @Input() public products$: Observable<Product[]>;
  @Output() public productToRemove = new EventEmitter<string>();
  @Output() public productToUpdate = new EventEmitter<Product>();
  @Output() public checkoutCompleted = new EventEmitter<boolean>();

  public submit(): void {
    this.checkoutCompleted.emit(true);
  }
}
