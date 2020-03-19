import { async, TestBed } from '@angular/core/testing';

import { CheckoutCompletedModule } from './checkout-summary.module';

describe('CheckoutCompletedModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutCompletedModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CheckoutCompletedModule).toBeDefined();
  });
});
