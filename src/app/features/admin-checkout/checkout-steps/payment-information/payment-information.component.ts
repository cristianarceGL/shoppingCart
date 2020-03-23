import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-payment-information',
  template: `
    <form [formGroup]="paymentFormParent">
      <mat-divider></mat-divider>
      <h6>Select Payment Method</h6>
      <p>
        Select money transfer using your bank account. Visa, Mastercard, American Express
        <span><img src="assets/credit-cards.png"/></span>
      </p>
      <mat-form-field class="mat-form-field" [hideRequiredMarker]="false" [floatLabel]="true">
        <input
          matInput
          placeholder="Name on Card"
          [formControl]="nameOnCardControl"
          data-cy="card-name"
          type="text"
          required
        />
        <mat-error *ngIf="nameOnCardControl.hasError('required')">
          Name on Card is required
        </mat-error>
        <mat-error *ngIf="nameOnCardControl.errors?.minlength">
          Name on Card must be at least {{ nameOnCardMinLength }} characters long
        </mat-error>
      </mat-form-field>
      <br />
      <br />
      <mat-form-field class="mat-form-field" [hideRequiredMarker]="false" [floatLabel]="true">
        <input
          matInput
          placeholder="Credit Card Number"
          [formControl]="creditCardNumberControl"
          data-cy="card-number"
          type="text"
          required
        />
        <mat-error *ngIf="creditCardNumberControl.hasError('required')">
          Credit Card Number is required
        </mat-error>
        <mat-error *ngIf="creditCardNumberControl.errors?.minlength">
          Credit Card Number must be {{ creditCardNumberLength }} characters long
        </mat-error>
      </mat-form-field>
      <br />
      <br />
      <mat-form-field class="mat-form-field-md" [hideRequiredMarker]="false" [floatLabel]="true">
        <input
          matInput
          placeholder="CVC Number"
          [formControl]="cvcNumberControl"
          data-cy="card-cvc"
          type="text"
          required
        />
        <mat-error *ngIf="cvcNumberControl.hasError('required')">
          CVC Number is required
        </mat-error>
        <mat-error *ngIf="cvcNumberControl.errors?.minlength">
          CVC Number must be at least {{ cvcNumberMinLength }} characters long
        </mat-error>
      </mat-form-field>
      <br />
      <br />
      <mat-form-field class="mat-form-field-md">
        <mat-label>Card Type</mat-label>
        <mat-select [formControl]="cardTypeControl" data-cy="card-type" required>
          <mat-option value="Visa" data-cy="card-type-visa">Visa</mat-option>
          <mat-option value="MasterCard" data-cy="card-type-mastercard">MasterCard</mat-option>
          <mat-option value="AmericanExpress" data-cy="card-type-amex">American Express</mat-option>
        </mat-select>
        <mat-error *ngIf="cardTypeControl.hasError('required')">Please choose a card</mat-error>
      </mat-form-field>
      <br />
      <br />
      <div fxLayout="row">
        <mat-form-field class="mat-form-field-sm mat-form-field-mr">
          <mat-label>Expiration Month</mat-label>
          <mat-select [formControl]="expirationMonthControl" data-cy="card-month" required>
            <mat-option *ngFor="let month of months" [value]="month">
              <div [attr.data-cy]="'card-month-' + month">
                {{ month }}
              </div>
            </mat-option>
          </mat-select>
          <mat-error *ngIf="expirationMonthControl.hasError('required')">Please choose a month</mat-error>
        </mat-form-field>
        <br />
        <mat-form-field class="mat-form-field-sm">
          <mat-label>Expiration Year</mat-label>
          <mat-select [formControl]="expirationYearControl" data-cy="card-year" required>
            <mat-option *ngFor="let year of years" [value]="year">
              <div [attr.data-cy]="'card-year-' + year">
                {{ year }}
              </div>
            </mat-option>
          </mat-select>
          <mat-error *ngIf="expirationYearControl.hasError('required')">Please choose a year</mat-error>
        </mat-form-field>
      </div>
      <br />
      <br />
    </form>
  `,
  styles: [
    `
      span {
        display: block;
      }
    `,
  ],
})
export class PaymentInformationComponent implements OnInit {
  @Input() public checkoutStepsForm: FormGroup;
  @Output() public paymentSummary = new EventEmitter<PaymentSummary>();

  public nameOnCardMinLength = 10;
  public creditCardNumberLength = 16;
  public cvcNumberMinLength = 3;
  public cvcNumberMaxLength = 4;

  public paymentFormParent: AbstractControl;
  public nameOnCardControl = new FormControl('', [Validators.required, Validators.minLength(this.nameOnCardMinLength)]);
  public creditCardNumberControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.creditCardNumberLength),
    Validators.maxLength(this.creditCardNumberLength),
  ]);
  public cvcNumberControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.cvcNumberMinLength),
    Validators.maxLength(this.cvcNumberMaxLength),
  ]);
  public cardTypeControl = new FormControl('', [Validators.required]);
  public expirationMonthControl = new FormControl('', [Validators.required]);
  public expirationYearControl = new FormControl('', [Validators.required]);

  public paymentFormChild = new FormGroup({
    nameOnCard: this.nameOnCardControl,
    creditCardNumber: this.creditCardNumberControl,
    cvcNumber: this.cvcNumberControl,
    cardType: this.cardTypeControl,
    expirationMonth: this.expirationMonthControl,
    expirationYear: this.expirationYearControl,
  });

  public months: string[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  public years: string[] = ['2020', '2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'];

  public ngOnInit(): void {
    this.checkoutStepsForm.setControl('paymentMethod', this.paymentFormChild);
    this.paymentFormParent = this.checkoutStepsForm.get('paymentMethod');
    this.paymentFormParent.valueChanges.subscribe(
      _ => this.paymentFormParent.status === 'VALID' && this.buildSummary()
    );
  }

  private buildSummary(): void {
    const summary = {
      cardName: this.paymentFormParent.get('nameOnCard').value,
      cardNumber: '**' + this.paymentFormParent.get('creditCardNumber').value.slice(-4),
      cardType: this.paymentFormParent.get('cardType').value,
    };
    this.paymentSummary.emit(summary);
  }
}
