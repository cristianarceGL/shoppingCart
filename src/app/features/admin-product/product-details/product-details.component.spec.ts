import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { ProductDetailsComponent } from '@app/features/admin-product/product-details/product-details.component';

describe('ProductDetailsComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsComponent, TestHostComponent],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
  });

  it('should show the title in the card', () => {
    testHostComponent.productDetailsComponent.product$ = of(products[0]);
    testHostFixture.detectChanges();
    expect(testHostFixture.nativeElement.querySelector('mat-card-title').innerText).toEqual(products[0].title);
  });

  it('should listen for itemQuantity emitted changes', () => {
    testHostComponent.productDetailsComponent.product$ = of(products[0]);
    spyOn(testHostComponent.productDetailsComponent.productInCart, 'emit');
    testHostFixture.detectChanges();

    testHostComponent.productDetailsComponent.itemQuantity = '100';
    testHostComponent.productDetailsComponent.toggleAddToCart();

    expect(testHostComponent.productDetailsComponent.productInCart.emit).toHaveBeenCalled();
  });

  it('should listen for backTo emitted changes', () => {
    testHostComponent.productDetailsComponent.product$ = of(products[0]);
    spyOn(testHostComponent.productDetailsComponent.backTo, 'emit');
    testHostFixture.detectChanges();

    testHostComponent.productDetailsComponent.redirectToList(null);

    expect(testHostComponent.productDetailsComponent.backTo.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-product-details></sc-product-details>
    `,
  })
  class TestHostComponent {
    @ViewChild(ProductDetailsComponent, { static: true })
    public productDetailsComponent: ProductDetailsComponent;
  }
});
