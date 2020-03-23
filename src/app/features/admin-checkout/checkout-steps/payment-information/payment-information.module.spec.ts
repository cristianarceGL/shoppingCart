import { async, TestBed } from '@angular/core/testing';

import { PaymentInformationModule } from './payment-information.module';

describe('PaymentInformationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentInformationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PaymentInformationModule).toBeDefined();
  });
});
