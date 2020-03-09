import { Store, select } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DisplayView } from '../core/common/enums/general.enum';
import { Product } from '../core/models/product.model';
import { ProductState } from './+state/+product.reducer';
import { ProductActions, ProductSelectors } from '@app/features/admin-product/+state';
import { Slide } from '../core/models/slide.model';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'sc-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss'],
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

  constructor(private store: Store<ProductState>, private location: LocationStrategy) {
    // preventing back button in browser
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  public ngOnInit(): void {
    this.products$ = this.store.pipe(select(ProductSelectors.selectAllProducts));
    this.slides$ = this.store.pipe(select(ProductSelectors.selectAllCarousel));
    this.store.dispatch(ProductActions.loadProducts());
    this.store.dispatch(ProductActions.loadCarouselProducts());
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public showItem(productId: string): void {
    this.productSelected$ = this.store.pipe(select(ProductSelectors.getProductSelected, { productId }));
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

  public addToCart(): void {
    // this.productSelected$ = this.store.pipe(select(ProductSelectors.getProductSelected, { productId }));
  }
}
