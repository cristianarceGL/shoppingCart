import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Output,
  OnInit,
  Input,
  ViewChild,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';

import { MatStepper, StepperSelectionEvent } from '@app/shared/material';
import { Product } from '@app/features/core/models/product.model';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-checkout-steps',
  template: `
    <div>
      <div id="registration">
        <form id="regForm" [formGroup]="checkoutStepsForm">
          <mat-horizontal-stepper #stepper linear (selectionChange)="selectionChange($event)">
            <mat-step formGroupName="shippingDetails" [stepControl]="checkoutStepsForm.get('shippingDetails')">
              <ng-template matStepLabel>Shipping</ng-template>
              <sc-shipping-information
                [checkoutStepsForm]="checkoutStepsForm"
                (isShippingEqualsBilling)="setShippingAsBilling($event)"
                (selectedShippingOption)="setShippingOption($event)"
                (shippingSummary)="setShippingSummary($event)"
              ></sc-shipping-information>
            </mat-step>
            <mat-step formGroupName="billingDetails" [stepControl]="checkoutStepsForm.get('billingDetails')">
              <ng-template matStepLabel>Billing</ng-template>
              <sc-billing-information
                [checkoutStepsForm]="checkoutStepsForm"
                [sameShippingBilling]="sameShippingBilling"
                (billingSummary)="setBillingSummary($event)"
                (paymentSummary)="setPaymentSummary($event)"
              ></sc-billing-information>
            </mat-step>
            <mat-step>
              <ng-template matStepLabel>Place Order</ng-template>
              <sc-place-order
                [products$]="products$"
                (checkoutCompleted)="setCheckoutCompleted($event)"
              ></sc-place-order>
            </mat-step>
          </mat-horizontal-stepper>
        </form>
      </div>
    </div>
  `,
  styles: [``],
})
export class CheckoutStepsComponent implements OnInit, AfterContentChecked {
  @Input() public products$: Observable<Product[]>;
  @Output() public selectedShippingOption = new EventEmitter<ShippingOptions>();
  @Output() public isCheckoutComplete = new EventEmitter<boolean>();
  @Output() public currentStepIndex = new EventEmitter<number>();
  @Output() public shippingSummary = new EventEmitter<ShippingSummary>();
  @Output() public billingSummary = new EventEmitter<BillingSummary>();
  @Output() public paymentSummary = new EventEmitter<PaymentSummary>();

  @ViewChild('stepper', { static: true }) private checkoutStepper: MatStepper;

  public checkoutStepsForm: FormGroup;
  public sameShippingBilling = false;

  constructor(private cdref: ChangeDetectorRef) {}

  public moveStepperToIndex(index: number): void {
    this.checkoutStepper.selectedIndex = index;
  }

  public selectionChange(value: StepperSelectionEvent): void {
    this.currentStepIndex.emit(value.selectedIndex);
  }

  public ngOnInit(): void {
    this.checkoutStepsForm = new FormGroup({
      shippingDetails: new FormGroup({
        shipping: new FormControl(null),
      }),
      billingDetails: new FormGroup({
        billing: new FormControl(null),
      }),
      paymentMethod: new FormGroup({
        payment: new FormControl(null),
      }),
    });
  }

  public ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }

  public setShippingAsBilling(value: boolean): void {
    this.sameShippingBilling = value;
  }

  public setShippingOption(value: ShippingOptions): void {
    this.selectedShippingOption.emit(value);
  }

  public setCheckoutCompleted(value: boolean): void {
    this.isCheckoutComplete.emit(true);
  }

  public setShippingSummary(shippingSummary: ShippingSummary): void {
    this.shippingSummary.emit(shippingSummary);
  }

  public setBillingSummary(billingSummary: BillingSummary): void {
    this.billingSummary.emit(billingSummary);
  }

  public setPaymentSummary(paymentSummary: PaymentSummary): void {
    this.paymentSummary.emit(paymentSummary);
  }
}
