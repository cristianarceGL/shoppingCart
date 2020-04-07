import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';

import { PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-payment-information',
  templateUrl: `./payment-information.component.html`,
  styleUrls: ['./payment-information.component.scss'],
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
