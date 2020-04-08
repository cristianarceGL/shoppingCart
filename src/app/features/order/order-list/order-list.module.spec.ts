import { async, TestBed } from '@angular/core/testing';
import { OrderListModule } from './order-list.module';

describe('OrderListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrderListModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(OrderListModule).toBeDefined();
  });
});
