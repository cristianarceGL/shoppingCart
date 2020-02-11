import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerControlComponent } from './spinner-control.component';
import { SpinnerControlModule } from './spinner-control.module';

describe('SpinnerControlComponent', () => {
  let component: SpinnerControlComponent;
  let fixture: ComponentFixture<SpinnerControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SpinnerControlModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the mat progress spinner', () => {
    const elSpinner = fixture.nativeElement.querySelectorAll('mat-progress-spinner');
    expect(elSpinner.length).toBeTruthy();
  });
});
