import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { MaterialModule } from '@app/shared/material';
import { products, user } from '@app/mockdata/data/models-data';

describe('HeaderComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should listen for checkoutCart emitted changes', () => {
    spyOn(component.headerComponent.checkoutCart, 'emit');
    fixture.detectChanges();
    component.headerComponent.doCheckout();
    expect(component.headerComponent.checkoutCart.emit).toHaveBeenCalled();
  });

  it('should listen for backTo emitted changes', () => {
    spyOn(component.headerComponent.signOut, 'emit');
    fixture.detectChanges();
    component.headerComponent.logOut();
    expect(component.headerComponent.signOut.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-header [user]="mockUser" [cartTotal]="mockCartTotal" [cartItems]="mockCartItems"></sc-header>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(HeaderComponent, { static: true })
    public headerComponent: HeaderComponent;
    public mockUser = user.user;
    public mockCartTotal = 3;
    public mockCartItems = [products[0], products[1], products[2]];
  }
});
