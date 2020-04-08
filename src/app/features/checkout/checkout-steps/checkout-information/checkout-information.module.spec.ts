import { async, TestBed } from '@angular/core/testing';

import { CheckoutInformationModule } from './checkout-information.module';

describe('CheckoutInformationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CheckoutInformationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CheckoutInformationModule).toBeDefined();
  });
});
