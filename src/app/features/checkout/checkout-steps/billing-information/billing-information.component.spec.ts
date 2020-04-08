import { Component, ViewChild } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { FormGroup, FormControl } from '@angular/forms';
import { BillingInformationComponent } from './billing-information.component';
import { CheckoutInformationModule } from '@app/features/checkout/checkout-steps/checkout-information/checkout-information.module';

describe('BillingInformationComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BillingInformationComponent, TestCmpWrapper],
      imports: [MaterialModule, CheckoutInformationModule, CdkStepperModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-billing-information
        [checkoutStepsForm]="mockFormGroup"
        [sameShippingBilling]="sameShippingBillingMock"
      ></sc-billing-information>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(BillingInformationComponent, { static: true })
    public billingInformationComponent: BillingInformationComponent;

    public sameShippingBillingMock = true;
    public mockFormGroup = new FormGroup({
      shippingDetails: new FormGroup({
        shipping: new FormControl(null),
      }),
      billingDetails: new FormGroup({
        billing: new FormControl(null),
      }),
      paymentMethod: new FormGroup({
        payment: new FormControl(null),
      }),
    });
  }
});
