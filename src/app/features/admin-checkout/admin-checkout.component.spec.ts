import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { OrdertState } from '../admin-order/state/order.reducer';
import { AdminCheckoutComponent } from './admin-checkout.component';
import { CheckoutStepsModule } from './checkout-steps/checkout-steps.module';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';
import * as orderActions from '@app/features/admin-order/state/order.actions';
import { StepSummaryModule } from './summaries/step-summary/step-summary.module';
import { OrderSummaryModule } from './summaries/order-summary/order-summary.module';
import { CheckoutCompletedModule } from './checkout-completed/checkout-summary.module';
import { OrderActionsList } from '@app/features/admin-order/state/order.actions.list';
import { mockedState, mockStepSummary, mockPaymentSummary } from '@app/mockdata/data/models-data';

describe('AdminCheckoutComponent', () => {
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
        OrderSummaryModule,
        CheckoutCompletedModule,
        CheckoutStepsModule,
        StepSummaryModule,
      ],
      declarations: [AdminCheckoutComponent, TestCmpWrapper],
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

  it('should dispatch add to order action', () => {
    component.adminCheckoutComponent.setCheckoutCompleted(true);

    const ordeCompletedAction = orderActions.orderCompleted();
    const store = jasmine.createSpyObj<Store<OrdertState>>('store', ['dispatch']);
    const orderActionsList = new OrderActionsList(store);

    orderActionsList.orderCompleted();
    expect(store.dispatch).toHaveBeenCalledWith(ordeCompletedAction);
  });

  it('should no make visible shipping nor billing summary', () => {
    component.adminCheckoutComponent.setCurrentStepIndex(0);
    expect(component.adminCheckoutComponent.showShippingSummary).toEqual(false);
    expect(component.adminCheckoutComponent.showBillingSummary).toEqual(false);
  });

  it('should make visible shipping summary', () => {
    component.adminCheckoutComponent.setCurrentStepIndex(1);
    expect(component.adminCheckoutComponent.showShippingSummary).toEqual(true);
    expect(component.adminCheckoutComponent.showBillingSummary).toEqual(false);
  });

  it('should make visible shipping and billing summary', () => {
    component.adminCheckoutComponent.setCurrentStepIndex(2);
    expect(component.adminCheckoutComponent.showShippingSummary).toEqual(true);
    expect(component.adminCheckoutComponent.showBillingSummary).toEqual(true);
  });

  it('should set the shipping summary', () => {
    component.adminCheckoutComponent.setShippingSummary(mockStepSummary);
    expect(component.adminCheckoutComponent.shippingSummary).toEqual(mockStepSummary);
  });

  it('should set the billing summary', () => {
    component.adminCheckoutComponent.setBillingSummary(mockStepSummary);
    expect(component.adminCheckoutComponent.billingSummary).toEqual(mockStepSummary);
  });

  it('should set the payment summary', () => {
    component.adminCheckoutComponent.setPaymentSummary(mockPaymentSummary);
    expect(component.adminCheckoutComponent.paymentSummary).toEqual(mockPaymentSummary);
  });

  it('should set shipping amount according to shipping option', () => {
    component.adminCheckoutComponent.setShippingOption(ShippingOptions.Standard);
    expect(component.adminCheckoutComponent.shippingAmount).toEqual(12.95);

    component.adminCheckoutComponent.setShippingOption(ShippingOptions.TwoDay);
    expect(component.adminCheckoutComponent.shippingAmount).toEqual(27.95);

    component.adminCheckoutComponent.setShippingOption(ShippingOptions.NextDay);
    expect(component.adminCheckoutComponent.shippingAmount).toEqual(32.95);

    component.adminCheckoutComponent.setShippingOption(ShippingOptions.Free);
    expect(component.adminCheckoutComponent.shippingAmount).toEqual(0);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-admin-checkout></sc-admin-checkout>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(AdminCheckoutComponent, { static: true })
    public adminCheckoutComponent: AdminCheckoutComponent;
  }
});
