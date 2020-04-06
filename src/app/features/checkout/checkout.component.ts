import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { OrderActions, OrderSelectors } from '@app/features/order/state';
import { CheckoutStepsComponent } from './checkout-steps/checkout-steps.component';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-checkout',
  templateUrl: `./checkout.component.html`,
  styleUrls: [`./checkout.component.scss`],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  @ViewChild('checkoutSteps', { static: false }) checkoutStepsComponent: CheckoutStepsComponent;

  public checkoutItems: Product[];
  public cartItems$: Observable<Product[] | null>;
  public cartTotalPrice$: Observable<number | null>;
  public selectedShipping: ShippingOptions;

  public shippingAmount = 0;
  public isCheckoutComplete = false;
  public showShippingSummary = false;
  public showBillingSummary = false;
  public shippingSummary: ShippingSummary;
  public billingSummary: BillingSummary;
  public paymentSummary: PaymentSummary;

  constructor(private applicationState: Store<ApplicationState>) {}

  public ngOnInit(): void {
    this.cartItems$ = this.applicationState.select(OrderSelectors.selectAllOrders);
    this.cartTotalPrice$ = this.applicationState.select(OrderSelectors.getCartTotalPrice);
  }

  public moveStepperToIndex(index: number): void {
    this.checkoutStepsComponent.moveStepperToIndex(index);
  }

  public setCheckoutCompleted(value: boolean): void {
    this.isCheckoutComplete = value;
    this.cartItems$
      .pipe(
        take(1),
        tap(checkItems => (this.checkoutItems = checkItems))
      )
      .subscribe()
      .unsubscribe();
    this.applicationState.dispatch(OrderActions.orderCompleted());
  }

  public setCurrentStepIndex(value: number): void {
    this.showShippingSummary = value > 0 ? true : false;
    this.showBillingSummary = value > 1 ? true : false;
  }

  public setShippingSummary(value: ShippingSummary): void {
    this.shippingSummary = value;
  }

  public setBillingSummary(value: BillingSummary): void {
    this.billingSummary = value;
  }

  public setPaymentSummary(value: PaymentSummary): void {
    this.paymentSummary = value;
  }

  public setShippingOption(value: ShippingOptions): void {
    this.selectedShipping = value;
    switch (value) {
      case ShippingOptions.Standard:
        this.shippingAmount = 12.95;
        break;
      case ShippingOptions.TwoDay:
        this.shippingAmount = 27.95;
        break;
      case ShippingOptions.NextDay:
        this.shippingAmount = 32.95;
        break;
      default:
        this.shippingAmount = 0;
    }
  }
}
