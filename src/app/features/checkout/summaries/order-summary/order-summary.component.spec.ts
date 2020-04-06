import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { OrderSummaryComponent } from './order-summary.component';

describe('OrderSummaryComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderSummaryComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
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
      <sc-order-summary
        [shippingAmount]="shippingAmountMock"
        [cartItems]="productsMock"
        [cartSubtotalPrice]="subTotalMock"
      ></sc-order-summary>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(OrderSummaryComponent, { static: true })
    public orderSummaryComponent: OrderSummaryComponent;

    public shippingAmountMock: 0;
    public subTotalMock: 500;
    public productsMock = [products[0], products[1], products[2]];
  }
});
