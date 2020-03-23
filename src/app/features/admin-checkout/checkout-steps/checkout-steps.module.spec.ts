import { async, TestBed } from '@angular/core/testing';

import { CheckoutStepsModule } from './checkout-steps.module';

describe('CheckoutStepsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutStepsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CheckoutStepsModule).toBeDefined();
  });
});
