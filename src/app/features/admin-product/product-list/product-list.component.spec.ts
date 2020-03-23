import { of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, ViewChild } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { products } from '@app/mockdata/data/models-data';
import { ProductListComponent } from '@app/features/admin-product/product-list/product-list.component';

describe('ProductDetailsComponent', () => {
  let testHostComponent: TestHostComponent;
  let testHostFixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent, TestHostComponent],
      imports: [SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    testHostFixture = TestBed.createComponent(TestHostComponent);
    testHostComponent = testHostFixture.componentInstance;
    testHostFixture.detectChanges();
  });

  it('should show the title in the first and third card', () => {
    const matCard = testHostFixture.nativeElement.querySelectorAll('mat-card-title');
    expect(matCard[0].innerText).toEqual(products[0].title);
    expect(matCard[2].innerText).toEqual(products[2].title);
  });

  it('should listen for product emitted changes', () => {
    spyOn(testHostComponent.productListComponent.productToShow, 'emit');
    testHostFixture.detectChanges();
    testHostComponent.productListComponent.redirectToDetails('123');
    expect(testHostComponent.productListComponent.productToShow.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-product-list [products$]="mockProducts$"></sc-product-list>
    `,
  })
  class TestHostComponent {
    @ViewChild(ProductListComponent, { static: true })
    public productListComponent: ProductListComponent;
    public mockProducts$ = of([products[0], products[1], products[2]]);
  }
});
