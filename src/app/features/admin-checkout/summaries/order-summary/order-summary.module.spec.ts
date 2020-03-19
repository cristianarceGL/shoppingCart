import { async, TestBed } from '@angular/core/testing';

import { OrderSummaryModule } from './order-summary.module';

describe('OrderSummaryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderSummaryModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(OrderSummaryModule).toBeDefined();
  });
});
