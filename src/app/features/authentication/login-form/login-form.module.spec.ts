import { async, TestBed } from '@angular/core/testing';

import { LogInFormModule } from './login-form.module';

describe('LogInFormModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [LogInFormModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LogInFormModule).toBeDefined();
  });
});
