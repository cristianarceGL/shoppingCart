import { async, TestBed } from '@angular/core/testing';

import { CheckoutModule } from '@app/features/checkout/checkout.module';

describe('AdminCheckoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CheckoutModule).toBeDefined();
  });
});
