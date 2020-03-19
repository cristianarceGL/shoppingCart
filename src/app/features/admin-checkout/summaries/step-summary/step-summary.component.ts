import { Component, Input, EventEmitter, Output } from '@angular/core';

import { ShippingOptions } from '@app/features/core/common/enums/general.enum';

@Component({
  selector: 'sc-step-summary',
  template: `
    <mat-card *ngIf="stepName === 'shipping'" class="mat-card">
      <mat-card-title>
        Shipping Summary <span (click)="moveBackToStep()" style="color: #0275D8">Edit</span>
      </mat-card-title>
      <mat-divider></mat-divider>
      <br />
      <mat-card-title> {{ stepSummary.firstName }} {{ stepSummary.lastName }} </mat-card-title>
      <mat-card-title>
        {{ stepSummary.addressLine1 }}
      </mat-card-title>
      <mat-card-title> {{ stepSummary.city }}, {{ stepSummary.region }}, {{ stepSummary.zipCode }} </mat-card-title>
      <mat-card-title>
        {{ stepSummary.country }}
      </mat-card-title>
      <mat-card-title>
        {{ stepSummary.phone }}
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
      <mat-card-title> {{ stepSummary.firstName }} {{ stepSummary.lastName }} </mat-card-title>
      <mat-card-title>
        {{ stepSummary.addressLine1 }}
      </mat-card-title>
      <mat-card-title> {{ stepSummary.city }}, {{ stepSummary.region }}, {{ stepSummary.zipCode }} </mat-card-title>
      <mat-card-title>
        {{ stepSummary.country }}
      </mat-card-title>
      <mat-card-title>
        {{ stepSummary.phone }}
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
        {{ stepSummary.cardName }}
      </mat-card-title>
      <mat-card-title>
        {{ stepSummary.cardNumber }}
      </mat-card-title>
      <mat-card-title>
        {{ stepSummary.cardType }}
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
export class StepSummaryComponent {
  @Input() public stepName: string;
  @Input() public stepSummary: any;
  @Input() public selectedShipping: ShippingOptions = ShippingOptions.Free;

  @Output() public backToStep = new EventEmitter<boolean>();

  public setShippingLabel() {
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
