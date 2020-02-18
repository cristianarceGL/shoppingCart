import { async, TestBed } from '@angular/core/testing';

import { LayoutModule } from '@app/features/core/layout/layout.module';

describe('LayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LayoutModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LayoutModule).toBeDefined();
  });
});
