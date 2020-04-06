import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { CheckoutCompletedComponent } from './checkout-summary.component';
import { mockStepSummary, mockPaymentSummary, products } from '@app/mockdata/data/models-data';

describe('CheckoutCompletedComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutCompletedComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should change the preview receipt to true', () => {
    component.checkoutCompletedComponent.previewReceipt();
    expect(component.checkoutCompletedComponent.previewInvoice).toEqual(true);
  });

  it('should get the invoice total', () => {
    expect(component.checkoutCompletedComponent.getInvoiceTotal()).toEqual(1770);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-checkout-completed
        [shippingSummary]="shippingSummaryMock"
        [billingSummary]="billingSummaryMock"
        [paymentSummary]="paymentSummaryMock"
        [products]="productsMock"
        [shippingAmount]="shippingAmountMock"
      ></sc-checkout-completed>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(CheckoutCompletedComponent, { static: true })
    public checkoutCompletedComponent: CheckoutCompletedComponent;

    public shippingSummaryMock = mockStepSummary;
    public billingSummaryMock = mockStepSummary;
    public paymentSummaryMock = mockPaymentSummary;
    public productsMock = [products[0], products[1], products[1]];
    public shippingAmountMock = 0;
  }
});
