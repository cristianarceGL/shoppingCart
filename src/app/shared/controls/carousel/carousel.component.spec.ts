import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '@app/shared/material';
import { CarouselComponent } from './carousel.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CarouselComponent', () => {
  let component: TestCmpWrapper;
  let fixture: ComponentFixture<TestCmpWrapper>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CarouselComponent, TestCmpWrapper],
      imports: [MaterialModule, FormsModule, BrowserAnimationsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCmpWrapper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the img src for path1', () => {
    const imgElement = fixture.nativeElement.querySelectorAll('img');
    expect(imgElement[0].src).toContain('test.path1');
  });

  it('should set the current slide to the last one', () => {
    component.carouselComponent.onPreviousClick();
    expect(component.carouselComponent.currentSlide).toEqual(2);
  });

  it('should set the current slide to the second one', () => {
    component.carouselComponent.onNextClick();
    expect(component.carouselComponent.currentSlide).toEqual(1);
  });

  @Component({
    selector: `sc-component`,
    template: `
      <sc-carousel [slides]="mockSlides"></sc-carousel>
    `,
  })
  class TestCmpWrapper {
    @ViewChild(CarouselComponent, { static: true })
    public carouselComponent: CarouselComponent;
    public mockSlides = [{ src: 'test.path1' }, { src: 'test.path2' }, { src: 'test.path3' }];
  }
});
