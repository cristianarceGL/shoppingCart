import { StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { AppComponent } from '@app/app.component';
import { LayoutModule } from '@app/features/core/layout/layout.module';
import { initialReducerMap, getInitialState, metaReducers } from '@app/features/global-state/app.state';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LayoutModule,
        StoreModule.forRoot(initialReducerMap, { initialState: getInitialState, metaReducers }),
      ],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'sc-admin-site'`, () => {
    expect(component.title).toEqual('sc-admin-site');
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('Gorilla Shopping Cart app is running!');
  });
});
