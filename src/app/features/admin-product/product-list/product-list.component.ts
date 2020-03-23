import { Observable } from 'rxjs';
import { Component, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Slide } from '@app/features/core/models/slide.model';
import { Product } from '@app/features/core/models/product.model';
import { CarouselComponent } from '@app/shared/controls/controls.module';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Component({
  selector: 'sc-product-list',
  template: `
    <div
      *ngIf="products$ | async; else showSpinner"
      gdAreas="header"
      gdGap="16px"
      gdRows="auto"
      gdAreas.lt-md="header"
      gdRows.lt-md="auto"
      data-cy="product-list"
    >
      <div gdArea="header">
        <sc-carousel [slides]="slides | async"></sc-carousel>
      </div>
      <div fxLayout="row wrap" fxLayoutAlign="space-between center">
        <div
          *ngFor="let product of products$ | async; let i = index"
          fxFlex="0 1 calc(33% - 32px)"
          fxFlex.lt-md="0 1 calc(50% - 32px)"
          fxFlex.lt-sm="100%"
        >
          <mat-card class="background-card" (click)="redirectToDetails(product.id)" [attr.data-cy]="'element-' + i">
            <mat-card-content [ngClass]="'percentage-' + product.percentage">
              <img mat-card-image [src]="product.imgUrl" alt="Photo of a Product" />
            </mat-card-content>
            <mat-card-header>
              <mat-card-title>{{ product.title }}</mat-card-title>
              <mat-card-subtitle>{{ product.price | currency }}</mat-card-subtitle>
            </mat-card-header>
          </mat-card>
        </div>
      </div>
      <br /><br /><br />
    </div>
    <ng-template #showSpinner>
      <div class="loading-indicator">
        <mat-progress-spinner [color]="'accent'" [mode]="'indeterminate'" [value]="50"> </mat-progress-spinner>
      </div>
    </ng-template>
  `,
  styles: [
    `
      .background-card {
        text-align: center;
      }

      .background-card .percentage-70 {
        background-color: #979797;
      }

      .background-card .percentage-80 {
        background-color: #c9383c;
      }

      .background-card .percentage-90 {
        background-color: #e8ba38;
      }

      .mat-card-image:last-child {
        margin: 0;
        width: auto;
      }
    `,
  ],
})
export class ProductListComponent implements OnDestroy {
  constructor(private subService: SubscriptionService) {}
  @Input() public products$: Observable<Product[]>;
  @Input() public slides: Observable<Slide[]>;
  @Output() public productToShow = new EventEmitter<string>();

  @ViewChild(CarouselComponent, { static: false }) carousel: CarouselComponent;

  public ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  public redirectToDetails = (productId: string) => this.productToShow.emit(productId);
}
