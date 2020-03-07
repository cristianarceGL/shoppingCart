import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';

import { MaterialModule } from '@app/shared/shared.module';
import { SnackBarControlComponent } from './snackbar.module';

describe('SnackBarControlComponent', () => {
  let component: SnackBarControlComponent;
  let fixture: ComponentFixture<SnackBarControlComponent>;
  const mockSnackBarRef = {
    close: jasmine.createSpy('close'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, ReactiveFormsModule, MaterialModule],
      providers: [
        { provide: MatSnackBarRef, useValue: mockSnackBarRef },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: {
            icon: 'error_outline',
            message: 'Error submitting request',
            color: 'error-snackbar',
          },
        },
      ],
      declarations: [SnackBarControlComponent],
    });

    TestBed.overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [SnackBarControlComponent],
      },
    });

    TestBed.compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackBarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
