import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LocationStrategy } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';

import { Slide } from '@app/features/core/models/slide.model';
import { OrderActions } from '@app/features/admin-order/+state';
import { Product } from '@app/features/core/models/product.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { DisplayView } from '@app/features/core/common/enums/general.enum';
import { ProductActions, ProductSelectors } from '@app/features/admin-product/+state';

@Component({
  selector: 'sc-admin-product',
  template: `
    <div data-cy="products-page">
      <sc-product-list
        *ngIf="currentView == DisplayView.List && products$"
        [products$]="products$"
        [slides]="slides$"
        (productToShow)="showItem($event)"
      >
      </sc-product-list>
      <sc-product-details
        *ngIf="currentView == DisplayView.Item && productSelected$"
        [product$]="productSelected$"
        (backTo)="showList()"
        (productInCart)="addToCart($event)"
      >
      </sc-product-details>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminProductComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  public searchValue = '';
  public DisplayView = DisplayView;
  public currentView = DisplayView.List;
  public currentProductId = '';

  public products$: Observable<Product[] | null>;
  public slides$: Observable<Slide[] | null>;
  public productSelected$: Observable<Product | null>;

  constructor(private applicationState: Store<ApplicationState>, private location: LocationStrategy) {
    // preventing back button in browser
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  public ngOnInit(): void {
    this.products$ = this.applicationState.pipe(select(ProductSelectors.selectAllProducts));
    this.slides$ = this.applicationState.pipe(select(ProductSelectors.selectAllCarousel));
    this.applicationState.dispatch(ProductActions.loadProducts());
    this.applicationState.dispatch(ProductActions.loadCarouselProducts());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public showItem(productId: string): void {
    this.productSelected$ = this.applicationState.pipe(select(ProductSelectors.getProductSelected, { productId }));
    this.subscripter();
    this.currentView = DisplayView.Item;
    this.currentProductId = productId;
  }

  private subscripter(): void {
    this.subscription.add(this.products$.subscribe());
    this.subscription.add(this.slides$.subscribe());
    this.subscription.add(this.productSelected$.subscribe());
  }

  public showList(): void {
    this.currentView = DisplayView.List;
  }

  public addToCart(product: Product): void {
    this.applicationState.dispatch(OrderActions.addToOrders({ product }));
  }
}
