import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';

import { User } from '@app/features/authentication/models/user';
import { Product } from '@app/features/core/models/product.model';

@Component({
  selector: 'sc-header',
  templateUrl: `./header.component.html`,
  styleUrls: [`./header.component.scss`],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() public user: User;
  @Input() public cartTotal = 0;
  @Input() public cartItems: Product[] | null;

  @Output() public signOut = new EventEmitter<void>();
  @Output() public checkoutCart = new EventEmitter<void>();

  public doCheckout(): void {
    this.checkoutCart.emit();
  }

  public logOut(): void {
    this.signOut.emit();
  }
}
