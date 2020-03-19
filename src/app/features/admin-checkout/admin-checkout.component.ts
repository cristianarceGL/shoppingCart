import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { take, tap } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, OnInit, ViewChild } from '@angular/core';

import { Product } from '@app/features/core/models/product.model';
import { ApplicationState } from '@app/features/global-state/app.state';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { OrderActions, OrderSelectors } from '@app/features/admin-order/+state';
import { CheckoutStepsComponent } from './checkout-steps/checkout-steps.component';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-admin-checkout',
  template: `
    <div data-cy="checkouts-page">
      <br />
      <sc-checkout-completed
        *ngIf="isCheckoutComplete"
        [products]="checkoutItems"
        [shippingAmount]="shippingAmount"
        [shippingSummary]="shippingSummary"
        [billingSummary]="billingSummary"
        [paymentSummary]="paymentSummary"
      ></sc-checkout-completed>
      <div *ngIf="!isCheckoutComplete">
        <br />
        <div fxLayout="row wrap" fxLayout.lt-sm="column" fxLayoutGap="32px" fxLayoutAlign="center">
          <sc-checkout-steps
            #checkoutSteps
            fxLayout="column"
            fxFlex="0 1 calc(75% - 32px)"
            fxFlex.lt-sm="100%"
            class="checkout-steps"
            [products$]="cartItems$"
            (selectedShippingOption)="setShippingOption($event)"
            (isCheckoutComplete)="setCheckoutCompleted($event)"
            (currentStepIndex)="setCurrentStepIndex($event)"
            (shippingSummary)="setShippingSummary($event)"
            (billingSummary)="setBillingSummary($event)"
            (paymentSummary)="setPaymentSummary($event)"
          ></sc-checkout-steps>
          <div fxFlex="0 1 calc(25% - 32px)" fxFlex.lt-sm="100%">
            <sc-order-summary
              class="order-summary"
              [shippingAmount]="shippingAmount"
              [cartItems]="cartItems$ | async"
              [cartSubtotalPrice]="cartTotalPrice$ | async"
            >
            </sc-order-summary>
            <br />
            <sc-step-summary
              *ngIf="showShippingSummary"
              class="step-summary"
              stepName="shipping"
              [stepSummary]="shippingSummary"
              [selectedShipping]="selectedShipping"
              (backToStep)="moveStepperToIndex(0)"
            >
            </sc-step-summary>
            <br />
            <sc-step-summary
              *ngIf="showBillingSummary"
              class="step-summary"
              stepName="billing"
              [stepSummary]="billingSummary"
              (backToStep)="moveStepperToIndex(1)"
            >
            </sc-step-summary>
            <br />
            <sc-step-summary
              *ngIf="showBillingSummary"
              class="step-summary"
              stepName="payment"
              [stepSummary]="paymentSummary"
              (backToStep)="moveStepperToIndex(1)"
            >
            </sc-step-summary>
          </div>
        </div>
        <br /><br /><br />
      </div>
    </div>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminOrderComponent implements OnInit {
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
        tap(x => (this.checkoutItems = x))
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
