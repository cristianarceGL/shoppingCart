import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { provideMockStore } from '@ngrx/store/testing';
import { OrderListComponent } from './order-list.component';
import { By } from '@angular/platform-browser';

describe('OrderListComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderListComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listen for product to remove emitted changes', () => {
    spyOn(component.orderListComponent.productToRemove, 'emit');
    fixture.detectChanges();
    component.orderListComponent.removeItem(products[0].id);
    expect(component.orderListComponent.productToRemove.emit).toHaveBeenCalled();
  });

  it('should listen for update quantity (substract) emitted changes', () => {
    spyOn(component.orderListComponent.productToUpdate, 'emit');
    fixture.detectChanges();
    component.orderListComponent.updateQuantity(products[0], 'substract');
    expect(component.orderListComponent.productToUpdate.emit).toHaveBeenCalled();
  });

  it('should listen for update quantity (add) emitted changes', () => {
    spyOn(component.orderListComponent.productToUpdate, 'emit');
    fixture.detectChanges();
    component.orderListComponent.updateQuantity(products[0], 'add');
    expect(component.orderListComponent.productToUpdate.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-order-list [products$]="mockProducts$"></sc-order-list>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(OrderListComponent, { static: true })
    public orderListComponent: OrderListComponent;
    public mockProducts$ = of([products[0], products[1], products[2]]);
  }
});
