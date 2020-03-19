import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, SimpleChanges } from '@angular/core';

import { MatCheckbox } from '@app/shared/shared.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';

@Component({
  selector: 'sc-billing-information',
  template: `
    <mat-checkbox #useShipping (change)="setShippingAsBilling($event.checked)">
      Use Shipping Address for Billing
    </mat-checkbox>
    <sc-checkout-information
      [checkoutStepsForm]="checkoutStepsForm"
      currentStep="billing"
      [sameShippingBilling]="sameShippingBilling"
      (isShippingEqualsBilling)="setShippingAsBilling($event.checked)"
      (shippingSummary)="setShippingSummary($event)"
      (paymentSummary)="setPaymentSummary($event)"
    >
    </sc-checkout-information>
    <br />
  `,
  styles: [``],
})
export class BillingInformationComponent implements OnChanges {
  @Input() public checkoutStepsForm: FormGroup;
  @Input() public sameShippingBilling: boolean;
  @Output() public selectedShippingOption = new EventEmitter<ShippingOptions>();
  @Output() public billingSummary = new EventEmitter<{}>();
  @Output() public paymentSummary = new EventEmitter<{}>();

  @ViewChild('useShipping', { static: false }) useShipping: MatCheckbox;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.sameShippingBilling) {
      if (changes.sameShippingBilling.currentValue) {
        this.useShipping.checked = true;
      }
      if (!changes.sameShippingBilling.currentValue && this.useShipping) {
        this.useShipping.checked = false;
      }
    }
  }

  public setShippingAsBilling(value: boolean): void {
    this.sameShippingBilling = value;
  }

  public setShippingSummary(billingSummary: {}): void {
    this.billingSummary.emit(billingSummary);
  }

  public setPaymentSummary(paymentSummary: {}): void {
    this.paymentSummary.emit(paymentSummary);
  }
}
