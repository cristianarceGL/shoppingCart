import { async, TestBed } from '@angular/core/testing';
import { NavigationModule } from './navigation.module';

describe('NavigationModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NavigationModule],
    }).compileComponents();
  }));

  it('should create the navigation module', () => {
    expect(NavigationModule).toBeDefined();
  });
});
