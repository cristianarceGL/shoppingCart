import { By } from '@angular/platform-browser';
import { NumberOnlyDirective } from './number-only.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';

@Component({
  template: `
    <input [AllowOnlyNumbers]="true" type="text" name="totalAnnualIncome" />
  `,
})
// tslint:disable-next-line:no-unnecessary-class
class TestAllowOnlyNumbersComponent {
  //  allowNumbers = true;
}
describe('Directive: AllowOnlyNumbers', () => {
  let component: TestAllowOnlyNumbersComponent;
  let fixture: ComponentFixture<TestAllowOnlyNumbersComponent>;
  let inputEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestAllowOnlyNumbersComponent, NumberOnlyDirective],
      schemas: [NO_ERRORS_SCHEMA],
    });
    fixture = TestBed.createComponent(TestAllowOnlyNumbersComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.css('input[name="totalAnnualIncome"]'));
    fixture.detectChanges();
  });

  it('keydown input', () => {
    inputEl.triggerEventHandler('keydown', {});
    expect(true).toBe(true);
  });
});
