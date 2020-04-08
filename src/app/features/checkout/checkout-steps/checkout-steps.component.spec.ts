import { CommonModule } from '@angular/common';
import { Component, ViewChild, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { SharedModule } from '@app/shared/shared.module';
import { CheckoutStepsComponent } from './checkout-steps.component';
import { PlaceOrderModule } from './place-order/place-order.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import { BillingInformationModule } from './billing-information/billing-information.module';
import { ShippingInformationModule } from './shipping-information/shipping-information.module';
import { mockedState, products, mockStepSummary, mockPaymentSummary } from '@app/mockdata/data/models-data';

describe('CheckoutStepsComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;
  const initialState = mockedState;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        ShippingInformationModule,
        BillingInformationModule,
        PlaceOrderModule,
      ],
      declarations: [CheckoutStepsComponent, TestCmpWrapper],
      providers: [provideMockStore({ initialState })],
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the shipping as billing', () => {
    component.checkoutStepsComponent.setShippingAsBilling(false);
    expect(component.checkoutStepsComponent.sameShippingBilling).toEqual(false);
  });

  it('should set the shipping summary', () => {
    spyOn(component.checkoutStepsComponent.selectedShippingOption, 'emit');
    fixture.detectChanges();
    component.checkoutStepsComponent.setShippingOption(ShippingOptions.Free);
    expect(component.checkoutStepsComponent.selectedShippingOption.emit).toHaveBeenCalled();
  });

  it('should set the checkout completed', () => {
    spyOn(component.checkoutStepsComponent.isCheckoutComplete, 'emit');
    fixture.detectChanges();
    component.checkoutStepsComponent.setCheckoutCompleted(true);
    expect(component.checkoutStepsComponent.isCheckoutComplete.emit).toHaveBeenCalled();
  });

  it('should emit the shipping summary', () => {
    spyOn(component.checkoutStepsComponent.shippingSummary, 'emit');
    fixture.detectChanges();
    component.checkoutStepsComponent.setShippingSummary(mockStepSummary);
    expect(component.checkoutStepsComponent.shippingSummary.emit).toHaveBeenCalledWith(mockStepSummary);
  });

  it('should emit the billing summary', () => {
    spyOn(component.checkoutStepsComponent.billingSummary, 'emit');
    fixture.detectChanges();
    component.checkoutStepsComponent.setBillingSummary(mockStepSummary);
    expect(component.checkoutStepsComponent.billingSummary.emit).toHaveBeenCalledWith(mockStepSummary);
  });

  it('should emit the payment summary', () => {
    spyOn(component.checkoutStepsComponent.paymentSummary, 'emit');
    fixture.detectChanges();
    component.checkoutStepsComponent.setPaymentSummary(mockPaymentSummary);
    expect(component.checkoutStepsComponent.paymentSummary.emit).toHaveBeenCalledWith(mockPaymentSummary);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-checkout-steps [products]="productsMock"></sc-checkout-steps>
    `,
  })
  class TestCmpWrapper implements AfterContentChecked {
    @ViewChild(CheckoutStepsComponent, { static: true })
    public checkoutStepsComponent: CheckoutStepsComponent;

    public productsMock = [products[0], products[1], products[2]];

    constructor(private cdref: ChangeDetectorRef) {}

    public ngAfterContentChecked(): void {
      this.cdref.detectChanges(); // TODO:
    }
  }
});
