import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { CartSummaryComponent } from './cart-summary.component';

describe('CartSummaryComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CartSummaryComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listen for product to remove emitted changes', () => {
    spyOn(component.cartSummaryComponent.toCheckout, 'emit');
    fixture.detectChanges();
    component.cartSummaryComponent.redirectToCheckout();
    expect(component.cartSummaryComponent.toCheckout.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-cart-summary [cartTotal]="mockCartTotal" [cartTotalPrice]="mockCartTotalPrice"></sc-cart-summary>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(CartSummaryComponent, { static: true })
    public cartSummaryComponent: CartSummaryComponent;
    public mockCartTotal = 5;
    public mockCartTotalPrice = 500;
  }
});
