import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { LayoutComponent } from './layout.component';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { mockedState } from '@app/mockdata/data/models-data';
import { AuthState } from '@app/features/authentication/+state/+auth.reducer';
import * as authActions from '@app/features/authentication/+state/+auth.actions';
import { AuthActionsList } from '@app/features/authentication/+state/+auth.actions.list';

describe('LayoutComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    const initialState = mockedState;

    TestBed.configureTestingModule({
      declarations: [LayoutComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule, HeaderModule, FooterModule, RouterTestingModule],
      providers: [provideMockStore({ initialState })],
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

  it('navigate to orders', () => {
    const routerstub: Router = TestBed.get(Router);
    spyOn(routerstub, 'navigate');
    component.layoutComponent.checkoutCart();
  });

  it('should dispatch logout action', () => {
    component.layoutComponent.logOut();

    const logoutAction = authActions.logout();
    const resetStateAction = authActions.resetStates();
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.logout();
    expect(store.dispatch).toHaveBeenCalledWith(logoutAction);

    authListActions.resetStates();
    expect(store.dispatch).toHaveBeenCalledWith(resetStateAction);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-layout></sc-layout>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(LayoutComponent, { static: true })
    public layoutComponent: LayoutComponent;
  }
});
