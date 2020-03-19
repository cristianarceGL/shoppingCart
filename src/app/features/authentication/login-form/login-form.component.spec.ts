import { Component, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { LoginFormComponent } from './login-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
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

  it('should listen for loginFormSubmit emitted changes', () => {
    spyOn(component.loginFormComponent.loginFormSubmit, 'emit');
    fixture.detectChanges();
    component.loginFormComponent.login();
    expect(component.loginFormComponent.loginFormSubmit.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-login-form></sc-login-form>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(LoginFormComponent, { static: true })
    public loginFormComponent: LoginFormComponent;
  }
});
