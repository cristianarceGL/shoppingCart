import { async, TestBed } from '@angular/core/testing';
import { AdminOrderModule } from './admin-order.module';

describe('AdminOrderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminOrderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AdminOrderModule).toBeDefined();
  });
});
