import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter, OnChanges, ViewChild, SimpleChanges } from '@angular/core';

import { MatCheckbox } from '@app/shared/shared.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-billing-information',
  templateUrl: './billing-information.component.html',
  styleUrls: ['./billing-information.component.scss'],
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

  public setShippingSummary(billingSummary: BillingSummary): void {
    this.billingSummary.emit(billingSummary);
  }

  public setPaymentSummary(paymentSummary: PaymentSummary): void {
    this.paymentSummary.emit(paymentSummary);
  }
}
