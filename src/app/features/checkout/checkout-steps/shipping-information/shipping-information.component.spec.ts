import { Component, ViewChild } from '@angular/core';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { FormGroup, FormControl } from '@angular/forms';
import { ShippingInformationComponent } from './shipping-information.component';
import { CheckoutInformationModule } from '@app/features/checkout/checkout-steps/checkout-information/checkout-information.module';

describe('ShippingInformationComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ShippingInformationComponent, TestCmpWrapper],
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
      <sc-shipping-information [checkoutStepsForm]="mockFormGroup"></sc-shipping-information>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(ShippingInformationComponent, { static: true })
    public shippingInformationComponent: ShippingInformationComponent;
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
