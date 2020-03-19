import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { ProductDetailsComponent } from './product-details.component';

describe('ProductDetailsComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show the title in the card', () => {
    expect(fixture.nativeElement.querySelector('mat-card-title').innerText).toEqual(products[0].title);
  });

  it('should listen for itemQuantity emitted changes', () => {
    spyOn(component.productDetailsComponent.productInCart, 'emit');
    fixture.detectChanges();
    component.productDetailsComponent.itemQuantity = '100';
    component.productDetailsComponent.toggleAddToCart();
    expect(component.productDetailsComponent.productAdded).toEqual(true);
    expect(component.productDetailsComponent.productInCart.emit).toHaveBeenCalled();
  });

  it('should listen for backTo emitted changes', () => {
    spyOn(component.productDetailsComponent.backTo, 'emit');
    fixture.detectChanges();
    component.productDetailsComponent.redirectToList(null);
    expect(component.productDetailsComponent.backTo.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-product-details [product$]="mockProduct$"></sc-product-details>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(ProductDetailsComponent, { static: true })
    public productDetailsComponent: ProductDetailsComponent;
    public mockProduct$ = of(products[0]);
  }
});
