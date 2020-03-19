import { async, TestBed } from '@angular/core/testing';

import { StepSummaryModule } from './step-summary.module';

describe('StepSummaryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [StepSummaryModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(StepSummaryModule).toBeDefined();
  });
});
