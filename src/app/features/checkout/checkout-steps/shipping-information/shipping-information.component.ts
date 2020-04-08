import { FormGroup } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';

import { MatRadioChange } from '@app/shared/material/material.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-shipping-information',
  templateUrl: `./shipping-information.component.html`,
  styleUrls: ['./shipping-information.component.scss'],
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
