import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { AdminProductComponent } from './admin-product.component';
import { mockedState, products } from '@app/mockdata/data/models-data';
import { ProductListModule } from './product-list/product-list.module';
import { DisplayView } from '@app/features/core/common/enums/general.enum';
import { OrdertState } from '@app/features/admin-order/+state/+order.reducer';
import { ProductDetailsModule } from './product-details/product-details.module';
import * as orderActions from '@app/features/admin-order/+state/+order.actions';
import { OrderActionsList } from '@app/features/admin-order/+state/+order.actions.list';

describe('AdminProductComponent', () => {
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
      declarations: [AdminProductComponent, TestCmpWrapper],
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
    component.adminProductComponent.showItem('123');
    expect(component.adminProductComponent.currentView).toEqual(DisplayView.Item);
    expect(component.adminProductComponent.currentProductId).toEqual('123');
  });

  it('should set the current view to list', () => {
    component.adminProductComponent.showList();
    expect(component.adminProductComponent.currentView).toEqual(DisplayView.List);
  });

  it('should dispatch add to cart action', () => {
    component.adminProductComponent.addToCart(products[0]);

    const addToOrdersAction = orderActions.addToOrders({ product: products[0] });
    const store = jasmine.createSpyObj<Store<OrdertState>>('store', ['dispatch']);
    const orderActionsList = new OrderActionsList(store);

    orderActionsList.addToOrders(products[0]);
    expect(store.dispatch).toHaveBeenCalledWith(addToOrdersAction);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-admin-product></sc-admin-product>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(AdminProductComponent, { static: true })
    public adminProductComponent: AdminProductComponent;
  }
});
