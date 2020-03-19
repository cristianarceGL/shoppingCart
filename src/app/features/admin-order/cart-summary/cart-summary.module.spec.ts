import { async, TestBed } from '@angular/core/testing';
import { CartSummaryModule } from './cart-summary.module';

describe('CartSummaryModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CartSummaryModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(CartSummaryModule).toBeDefined();
  });
});
