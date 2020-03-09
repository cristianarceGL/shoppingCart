import { async, TestBed } from '@angular/core/testing';

import { AdminProductModule } from '@app/features/admin-product/admin-product.module';

describe('AdminProductModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminProductModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AdminProductModule).toBeDefined();
  });
});
