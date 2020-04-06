import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { StepSummaryComponent } from './step-summary.component';
import { mockStepSummary } from '@app/mockdata/data/models-data';
import { ShippingOptions } from '@app/features/core/common/enums/general.enum';

describe('StepSummaryComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepSummaryComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should listen for back to specific step emitted changes', () => {
    spyOn(component.stepSummaryComponent.backToStep, 'emit');
    fixture.detectChanges();
    component.stepSummaryComponent.moveBackToStep();
    expect(component.stepSummaryComponent.backToStep.emit).toHaveBeenCalled();
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-step-summary stepName="shipping" [stepSummary]="mockStepSummary"></sc-step-summary>
      <sc-step-summary
        stepName="shipping"
        [stepSummary]="mockStepSummary"
        [selectedShipping]="mockShippingStandard"
      ></sc-step-summary>
      <sc-step-summary
        stepName="shipping"
        [stepSummary]="mockStepSummary"
        [selectedShipping]="mockShippingTwoDay"
      ></sc-step-summary>
      <sc-step-summary
        stepName="shipping"
        [stepSummary]="mockStepSummary"
        [selectedShipping]="mockShippingNextDay"
      ></sc-step-summary>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(StepSummaryComponent, { static: true })
    public stepSummaryComponent: StepSummaryComponent;

    public mockShippingStandard: ShippingOptions = ShippingOptions.Standard;
    public mockShippingTwoDay: ShippingOptions = ShippingOptions.TwoDay;
    public mockShippingNextDay: ShippingOptions = ShippingOptions.NextDay;
    public mockStepSummary = mockStepSummary;
  }
});
