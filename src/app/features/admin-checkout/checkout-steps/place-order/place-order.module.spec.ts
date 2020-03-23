import { async, TestBed } from '@angular/core/testing';

import { PlaceOrderModule } from './place-order.module';

describe('PlaceOrderModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PlaceOrderModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(PlaceOrderModule).toBeDefined();
  });
});
