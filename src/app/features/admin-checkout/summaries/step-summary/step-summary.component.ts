import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { ShippingSummary, BillingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-step-summary',
  template: `
    <mat-card *ngIf="stepName === 'shipping'" class="mat-card">
      <mat-card-title>
        Shipping Summary <span (click)="moveBackToStep()" style="color: #0275D8">Edit</span>
      </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title> {{ shippingSummary.firstName }} {{ shippingSummary.lastName }} </mat-card-title>
      <mat-card-title>
        {{ shippingSummary.addressLine1 }}
      </mat-card-title>
      <mat-card-title>
        {{ shippingSummary.city }}, {{ shippingSummary.region }}, {{ shippingSummary.zipCode }}
      </mat-card-title>
      <mat-card-title>
        {{ shippingSummary.country }}
      </mat-card-title>
      <mat-card-title>
        {{ shippingSummary.phone }}
      </mat-card-title>
      <br />
      <mat-card-title> {{ setShippingLabel() }} Shipping </mat-card-title>
    </mat-card>
    <mat-card *ngIf="stepName === 'billing'" class="mat-card">
      <mat-card-title>
        Billing Summary <span (click)="moveBackToStep()" style="color: #0275D8">Edit</span>
      </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title> {{ billingSummary.firstName }} {{ billingSummary.lastName }} </mat-card-title>
      <mat-card-title>
        {{ billingSummary.addressLine1 }}
      </mat-card-title>
      <mat-card-title>
        {{ billingSummary.city }}, {{ billingSummary.region }}, {{ billingSummary.zipCode }}
      </mat-card-title>
      <mat-card-title>
        {{ billingSummary.country }}
      </mat-card-title>
      <mat-card-title>
        {{ billingSummary.phone }}
      </mat-card-title>
      <br />
    </mat-card>
    <mat-card *ngIf="stepName === 'payment'" class="mat-card">
      <mat-card-title>
        Payment Method <span (click)="moveBackToStep()" style="color: #0275D8">Edit</span>
      </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title>
        {{ paymentSummary.cardName }}
      </mat-card-title>
      <mat-card-title>
        {{ paymentSummary.cardNumber }}
      </mat-card-title>
      <mat-card-title>
        {{ paymentSummary.cardType }}
      </mat-card-title>
      <br />
    </mat-card>
  `,
  styles: [
    `
      mat-card-title {
        place-content: center space-between;
        align-items: center;
        flex-direction: row;
        box-sizing: border-box;
        display: flex;
      }

      .mat-card {
        border-radius: 4px 4px 0 0;
        white-space: nowrap;
      }
      .mat-card-image {
        margin: 0;
        width: 25%;
      }
    `,
  ],
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
