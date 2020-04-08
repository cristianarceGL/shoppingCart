import { MatSelect } from '@angular/material';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges, SimpleChanges } from '@angular/core';

import { regionsCR, regionsUS } from '@app/mockdata/data/models-data';
import { Country, Region } from '@app/features/core/models/country.model';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { MatRadioChange, MatCheckbox } from '@app/shared/material/material.module';
import { CustomErrorStateMatcher } from '@app/features/core/utils/error-state-matcher';
import { ShippingSummary, PaymentSummary } from '@app/features/core/models/summary.model';

@Component({
  selector: 'sc-checkout-information',
  templateUrl: './checkout-information.component.html',
  styleUrls: ['./checkout-information.component.scss'],
})
export class CheckoutInformationComponent implements OnInit, OnChanges {
  @Input() public checkoutStepsForm: FormGroup;
  @Input() public sameShippingBilling: boolean;
  @Input() public currentStep: string;

  @Output() public isShippingEqualsBilling = new EventEmitter<boolean>();
  @Output() public selectedShippingOption = new EventEmitter<ShippingOptions>();
  @Output() public shippingSummary = new EventEmitter<ShippingSummary>();
  @Output() public paymentSummary = new EventEmitter<PaymentSummary>();

  @ViewChild('countrySelect', { static: false }) countrySelect: MatSelect;
  @ViewChild('stateSelect', { static: false }) stateSelect: MatSelect;

  public checkoutFormParent: AbstractControl;
  public paymentFormParent: AbstractControl;
  public isPaymentValid: boolean;
  public textMinLength = 3;
  public zipCodeLength = 5;
  public phoneMinLength = 8;

  public regions: Region[];
  public countries: Country[] = [
    {
      name: 'Costa Rica',
      code: 'cr',
      regions: regionsCR.regions,
    },
    {
      name: 'United States',
      code: 'us',
      regions: regionsUS.regions,
    },
  ];

  public firstNameControl = new FormControl('', [Validators.required, Validators.minLength(this.textMinLength)]);
  public lastNameControl = new FormControl('', [Validators.required, Validators.minLength(this.textMinLength)]);
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public companyControl = new FormControl('');
  public addressLine1Control = new FormControl('', [Validators.required, Validators.minLength(this.textMinLength)]);
  public addressLine2Control = new FormControl('');
  public countryControl = new FormControl('', [Validators.required]);
  public regionControl = new FormControl('', [Validators.required]);
  public cityControl = new FormControl('', [Validators.required, Validators.minLength(this.textMinLength)]);
  public zipCodeControl = new FormControl('', [
    Validators.required,
    Validators.minLength(this.zipCodeLength),
    Validators.maxLength(this.zipCodeLength),
  ]);
  public phoneControl = new FormControl('', [Validators.required, Validators.minLength(this.phoneMinLength)]);
  public matcher = new CustomErrorStateMatcher();

  public chekoutFormChild = new FormGroup({
    firstname: this.firstNameControl,
    lastname: this.lastNameControl,
    email: this.emailControl,
    company: this.companyControl,
    addressLine1: this.addressLine1Control,
    addressLine2: this.addressLine2Control,
    country: this.countryControl,
    region: this.regionControl,
    city: this.cityControl,
    zipCode: this.zipCodeControl,
    phone: this.phoneControl,
  });

  public paymentFormChild = new FormGroup({
    override: new FormControl(null),
  });

  public shippingOptions: string[] = [
    ShippingOptions.Free,
    ShippingOptions.Standard,
    ShippingOptions.TwoDay,
    ShippingOptions.NextDay,
  ];

  public ngOnInit(): void {
    if (this.currentStep === 'shipping') {
      this.checkoutStepsForm.setControl('shippingDetails', this.chekoutFormChild);
      this.checkoutFormParent = this.checkoutStepsForm.get('shippingDetails');
    } else {
      this.checkoutStepsForm.setControl('billingDetails', this.chekoutFormChild);
      this.checkoutFormParent = this.checkoutStepsForm.get('billingDetails');
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.sameShippingBilling) {
      if (changes.sameShippingBilling.currentValue) {
        this.setShippingBilling();
      }
      if (!changes.sameShippingBilling.currentValue && this.checkoutFormParent) {
        this.checkoutFormParent.reset();
      }
    }
  }

  private setShippingBilling(): void {
    const shipping = this.checkoutStepsForm.get('shippingDetails');
    this.checkoutFormParent.patchValue(shipping.value);
    this.countrySelect.value = shipping.value.country;
    this.regions = shipping.value.country.regions;
    this.stateSelect.value = shipping.value.region;
  }

  public setShippingAsBilling(value: MatCheckbox): void {
    this.isShippingEqualsBilling.emit(value.checked);
  }

  public setShippingOption(radioChange: MatRadioChange): void {
    this.selectedShippingOption.emit(radioChange.value);
  }

  public countryChanged(country: Country): void {
    this.regions = country ? country.regions : [];
  }

  public informationSubmitted(): void {
    this.buildSummary();
  }

  private buildSummary(): void {
    const summary = {
      firstName: this.checkoutFormParent.get('firstname').value,
      lastName: this.checkoutFormParent.get('lastname').value,
      email: this.checkoutFormParent.get('email').value,
      addressLine1: this.checkoutFormParent.get('addressLine1').value,
      country: this.checkoutFormParent.get('country').value.name,
      region: this.checkoutFormParent.get('region').value.region,
      city: this.checkoutFormParent.get('city').value,
      zipCode: this.checkoutFormParent.get('zipCode').value,
      phone: this.checkoutFormParent.get('phone').value,
    };
    this.shippingSummary.emit(summary);
  }

  public setPaymentSummary(event: PaymentSummary): void {
    this.paymentSummary.emit(event);
  }

  public compareCountryItems(country1: Country, country2: Country): boolean {
    return country1 && country2 && country1.name === country2.name;
  }

  public compareStateItems(region1: Region, region2: Region): boolean {
    return region1 && region2 && region1.region === region2.region;
  }
}
