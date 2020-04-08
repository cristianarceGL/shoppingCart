import { FormGroup, FormControl } from '@angular/forms';
import { Component, EventEmitter, Output, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';

import { MatStepper, StepperSelectionEvent } from '@app/shared/material';
import { Product } from '@app/features/core/models/product.model';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-checkout-steps',
  templateUrl: `./checkout-steps.component.html`,
  styleUrls: [`./checkout-steps.component.scss`],
})
export class CheckoutStepsComponent implements OnInit {
  @Input() public products: Product[];
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
