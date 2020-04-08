import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { ProductComponent } from './product.component';
import { mockedState, products } from '@app/mockdata/data/models-data';
import { ProductListModule } from './product-list/product-list.module';
import { DisplayView } from '@app/features/core/common/enums/general.enum';
import { OrdertState } from '@app/features/order/state/order.reducer';
import { ProductDetailsModule } from './product-details/product-details.module';
import * as orderActions from '@app/features/order/state/order.actions';
import { OrderActionsList } from '@app/features/order/state/order.actions.list';

describe('ProductComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  const initialState = mockedState;

  const locationStub = {
    onPopState: jasmine.createSpy('onPopState'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        FormsModule,
        RouterTestingModule,
        ProductListModule,
        ProductDetailsModule,
      ],
      declarations: [ProductComponent, TestCmpWrapper],
      providers: [provideMockStore({ initialState }), { provide: Location, useValue: locationStub }],
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

  it('should get product selected action', () => {
    component.productComponent.showItem('123');
    expect(component.productComponent.currentView).toEqual(DisplayView.Item);
    expect(component.productComponent.currentProductId).toEqual('123');
  });

  it('should set the current view to list', () => {
    component.productComponent.showList();
    expect(component.productComponent.currentView).toEqual(DisplayView.List);
  });

  it('should dispatch add to cart action', () => {
    component.productComponent.addToCart(products[0]);

    const addToOrdersAction = orderActions.addToOrders({ product: products[0] });
    const store = jasmine.createSpyObj<Store<OrdertState>>('store', ['dispatch']);
    const orderActionsList = new OrderActionsList(store);

    orderActionsList.addToOrders(products[0]);
    expect(store.dispatch).toHaveBeenCalledWith(addToOrdersAction);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-product></sc-product>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(ProductComponent, { static: true })
    public productComponent: ProductComponent;
  }
});
