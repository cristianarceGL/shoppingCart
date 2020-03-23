import { of } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { products } from '@app/mockdata/data/models-data';
import { PlaceOrderComponent } from './place-order.component';

describe('PlaceOrderComponent', () => {
  let hostComponent: TestCmpWrapper;
  let hostFixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceOrderComponent, TestCmpWrapper],
      imports: [MaterialModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestCmpWrapper);
    hostComponent = hostFixture.componentInstance;
  });

  it('should show the title in the first and third card', () => {
    hostFixture.detectChanges();
    const matCard0 = hostFixture.nativeElement.querySelector('mat-card[data-cy=element-0]');
    expect(matCard0.innerText).toContain(products[0].title);
    const matCard2 = hostFixture.nativeElement.querySelector('mat-card[data-cy=element-2]');
    expect(matCard2.innerText).toContain(products[2].title);
  });

  it('should listen for submit emitted changes', () => {
    spyOn(hostComponent.placeOrderComponent.checkoutCompleted, 'emit');
    hostFixture.detectChanges();
    hostComponent.placeOrderComponent.submit();
    expect(hostComponent.placeOrderComponent.checkoutCompleted.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-place-order [products$]="mockProducts$"></sc-place-order>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(PlaceOrderComponent, { static: true })
    public placeOrderComponent: PlaceOrderComponent;
    public mockProducts$ = of([products[0], products[1], products[2]]);
  }
});
