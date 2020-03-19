import { async, TestBed } from '@angular/core/testing';

import { BillingInformationModule } from './billing-information.module';

describe('BillingInformationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BillingInformationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BillingInformationModule).toBeDefined();
  });
});
