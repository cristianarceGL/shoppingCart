import { Observable } from 'rxjs';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-place-order',
  templateUrl: `place-order.component.html`,
  styleUrls: ['place-order.component.scss'],
})
export class PlaceOrderComponent {
  @Input() public products$: Observable<Product[]>;
  @Output() public checkoutCompleted = new EventEmitter<boolean>();

  public submit(): void {
    this.checkoutCompleted.emit(true);
  }
}
