import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '@app/shared/material';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockedState, products } from '@app/mockdata/data/models-data';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { OrderComponent } from './order.component';
import { OrderListModule } from './order-list/order-list.module';
import { CartSummaryModule } from './cart-summary/cart-summary.module';
import { OrdertState } from '@app/features/order/state/order.reducer';
import * as orderActions from '@app/features/order/state/order.actions';
import { OrderActionsList } from '@app/features/order/state/order.actions.list';

describe('OrderComponent', () => {
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
        OrderListModule,
        CartSummaryModule,
      ],
      declarations: [OrderComponent, TestCmpWrapper],
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

  it('navigate to checkouts', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.orderComponent.redirectToCheckout();
  });

  it('should dispatch add to order action', () => {
    component.orderComponent.updateItem(products[0]);

    const addToOrderAction = orderActions.addToOrders({ product: products[0] });
    const store = jasmine.createSpyObj<Store<OrdertState>>('store', ['dispatch']);
    const orderActionsList = new OrderActionsList(store);

    orderActionsList.addToOrders(products[0]);
    expect(store.dispatch).toHaveBeenCalledWith(addToOrderAction);
  });

  it('should dispatch remove from order action', () => {
    component.orderComponent.removeItem(products[0].id);

    const removeFromOrderAction = orderActions.removeFromOrder({ productId: products[0].id });
    const store = jasmine.createSpyObj<Store<OrdertState>>('store', ['dispatch']);
    const orderActionsList = new OrderActionsList(store);

    orderActionsList.removeFromOrder(products[0].id);
    expect(store.dispatch).toHaveBeenCalledWith(removeFromOrderAction);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-order></sc-order>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(OrderComponent, { static: true })
    public orderComponent: OrderComponent;
  }
});
