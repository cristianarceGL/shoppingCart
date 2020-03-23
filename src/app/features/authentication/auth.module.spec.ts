import { async, TestBed } from '@angular/core/testing';

import { AuthModule } from '@app/features/authentication/auth.module';

describe('AuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthModule).toBeDefined();
  });
});
