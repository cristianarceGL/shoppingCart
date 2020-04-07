import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from '@app/shared/material';
import { mockedState, authenticate } from '@app/mockdata/data/models-data';
import { AuthComponent } from '@app/features/authentication/auth.component';
import { AuthState } from '@app/features/authentication/state/auth.reducer';
import * as authActions from '@app/features/authentication/state/auth.actions';
import { AuthActionsList } from '@app/features/authentication/state/auth.actions.list';
import { LogInFormModule } from '@app/features/authentication/login-form/login-form.module';

describe('AuthComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    const initialState = mockedState;

    TestBed.configureTestingModule({
      declarations: [AuthComponent, TestCmpWrapper],
      imports: [MaterialModule, BrowserAnimationsModule, FormsModule, LogInFormModule, RouterTestingModule],
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

  it('should dispatch logout action', () => {
    component.authComponent.login(authenticate.authenticate);

    const loginAction = authActions.login({ authenticate: authenticate.authenticate });
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['dispatch']);
    const authListActions = new AuthActionsList(store);

    authListActions.login();
    expect(store.dispatch).toHaveBeenCalledWith(loginAction);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-auth></sc-auth>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(AuthComponent, { static: true })
    public authComponent: AuthComponent;
  }
});
