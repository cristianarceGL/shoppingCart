import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatRadioChange } from '@app/shared/material/material.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-shipping-information',
  template: `
    <sc-checkout-information
      [checkoutStepsForm]="checkoutStepsForm"
      currentStep="shipping"
      (shippingSummary)="setShippingSummary($event)"
    >
      <div shippingBilling>
        <mat-checkbox (change)="setShippingAsBilling($event.checked)">Use this address for Billing</mat-checkbox>
        <br />
        <br />
        <mat-divider></mat-divider>
      </div>
      <div selectShipping>
        <br />
        <h6>Select Shipping</h6>
        <mat-radio-group class="radio-group" (change)="setShippingOption($event)">
          <mat-radio-button
            class="radio-button"
            *ngFor="let shippingOption of shippingOptions"
            [value]="shippingOption"
          >
            {{ shippingOption }}
          </mat-radio-button>
        </mat-radio-group>
      </div>
    </sc-checkout-information>
  `,
  styles: [
    `
      .radio-group {
        display: flex;
        flex-direction: column;
        margin: 15px 0;
      }

      .radio-button {
        margin: 5px;
      }
    `,
  ],
})
export class ShippingInformationComponent {
  @Input() public checkoutStepsForm: FormGroup;
  @Output() public isShippingEqualsBilling = new EventEmitter<boolean>();
  @Output() public selectedShippingOption = new EventEmitter<ShippingOptions>();
  @Output() public shippingSummary = new EventEmitter<ShippingSummary>();

  public shippingOptions: string[] = [
    ShippingOptions.Free,
    ShippingOptions.Standard,
    ShippingOptions.TwoDay,
    ShippingOptions.NextDay,
  ];

  public setShippingAsBilling(value: boolean): void {
    this.isShippingEqualsBilling.emit(value);
  }

  public setShippingOption(radioChange: MatRadioChange): void {
    this.selectedShippingOption.emit(radioChange.value);
  }

  public setShippingSummary(shippingSummary: ShippingSummary): void {
    this.shippingSummary.emit(shippingSummary);
  }
}
