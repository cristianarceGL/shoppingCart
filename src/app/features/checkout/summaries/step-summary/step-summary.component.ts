import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-step-summary',
  templateUrl: `./step-summary.component.html`,
  styleUrls: [`./step-summary.component.scss`],
})
export class StepSummaryComponent implements OnInit {
  @Input() public stepName: string;
  @Input() public stepSummary: ShippingSummary | BillingSummary | PaymentSummary;
  @Input() public selectedShipping: ShippingOptions = ShippingOptions.Free;

  @Output() public backToStep = new EventEmitter<boolean>();

  public shippingSummary: ShippingSummary;
  public billingSummary: BillingSummary;
  public paymentSummary: PaymentSummary;

  public ngOnInit(): void {
    switch (this.stepName) {
      case 'billing':
        this.billingSummary = this.stepSummary as BillingSummary;
        break;
      case 'payment':
        this.paymentSummary = this.stepSummary as PaymentSummary;
        break;
      default:
        this.shippingSummary = this.stepSummary as ShippingSummary;
    }
  }

  public setShippingLabel(): string {
    let shippingLabel = '';
    switch (this.selectedShipping) {
      case ShippingOptions.Standard:
        shippingLabel = 'STANDARD';
        break;
      case ShippingOptions.TwoDay:
        shippingLabel = 'TWO DAY';
        break;
      case ShippingOptions.NextDay:
        shippingLabel = 'NEXT DAY';
        break;
      default:
        shippingLabel = 'FREE';
    }
    return shippingLabel;
  }

  public moveBackToStep(): void {
    this.backToStep.emit(true);
  }
}
