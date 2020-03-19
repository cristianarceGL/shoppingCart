import { StoreModule } from '@ngrx/store';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LayoutModule } from '@app/features/core/layout/layout.module';
import { initialReducerMap, getInitialState, metaReducers } from '@app/features/global-state/app.state';

describe('LayoutModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        StoreModule.forRoot(initialReducerMap, { initialState: getInitialState, metaReducers }),
      ],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(LayoutModule).toBeDefined();
  });
});
