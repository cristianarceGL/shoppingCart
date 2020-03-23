import { async, TestBed } from '@angular/core/testing';

import { ShippingInformationModule } from './shipping-information.module';

describe('ShippingInformationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ShippingInformationModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ShippingInformationModule).toBeDefined();
  });
});
