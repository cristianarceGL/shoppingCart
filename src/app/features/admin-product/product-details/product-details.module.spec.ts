import { async, TestBed } from '@angular/core/testing';

import { ProductDetailsModule } from '@app/features/admin-product/product-details/product-details.module';

describe('ProductDetailsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ProductDetailsModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ProductDetailsModule).toBeDefined();
  });
});
