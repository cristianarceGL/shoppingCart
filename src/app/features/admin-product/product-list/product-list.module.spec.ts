import { async, TestBed } from '@angular/core/testing';

import { ProductListModule } from '@app/features/admin-product/product-list/product-list.module';

describe('ProductListModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProductListModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProductListModule).toBeDefined();
  });
});
