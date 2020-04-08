import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { take, switchMap } from 'rxjs/operators';
import { CanActivate, Router } from '@angular/router';

import { OrderSelectors } from '@app/features/order/state';
import { ApplicationState } from '@app/features/global-state/app.state';

@Injectable({
  providedIn: 'root',
})
export class OrderCheckoutGuard implements CanActivate {
  constructor(private applicationState: Store<ApplicationState>, public router: Router) {}

  public canActivate(): Observable<boolean> {
    return this.applicationState.select(OrderSelectors.getCartTotal).pipe(
      take(1),
      switchMap(async itemsForCheckout => {
        if (itemsForCheckout) {
          return true;
        } else {
          this.router.navigate(['/products']);
          return false;
        }
      })
    );
  }
}
