import { Observable } from 'rxjs';
import { Component, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { Slide } from '@app/features/core/models/slide.model';
import { Product } from '@app/features/core/models/product.model';
import { AnimationType } from '@app/shared/controls/carousel/carousel.animations';
import { CarouselComponent } from '@app/shared/controls/carousel/carousel.module';
import { SubscriptionService } from '@app/features/core/firebase/services/subscription.service';

@Component({
  selector: 'sc-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnDestroy {
  constructor(private subService: SubscriptionService) {}
  @Input() public products$: Observable<Product[]>;
  @Input() public slides: Observable<Slide[]>;
  @Output() public productToShow = new EventEmitter<string>();

  @ViewChild(CarouselComponent, { static: false }) carousel: CarouselComponent;

  public animationType = AnimationType.Scale;

  public ngOnDestroy(): void {
    this.subService.unsubscribeComponent$.next();
  }

  public redirectToDetails = (productId: string) => this.productToShow.emit(productId);
}
