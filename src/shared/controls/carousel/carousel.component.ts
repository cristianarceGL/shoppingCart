import { Component, Input } from '@angular/core';
import { style, animate, animation } from '@angular/animations';
import { trigger, transition, useAnimation } from '@angular/animations';

// =========================
// Enum for referencing animations
// =========================
export enum AnimationType {
  Scale = 'scale',
}

// =========================
// Scale
// =========================
export const scaleIn = animation([
  style({ opacity: 0, transform: 'scale(0.5)' }), // start state
  animate('{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({ opacity: 1, transform: 'scale(1)' })),
]);

export const scaleOut = animation([
  animate('{{time}} cubic-bezier(0.785, 0.135, 0.15, 0.86)', style({ opacity: 0, transform: 'scale(0.5)' })),
]);

@Component({
  selector: 'sc-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [useAnimation(scaleIn, { params: { time: '500ms' } })]),
      transition('scale => void', [useAnimation(scaleOut, { params: { time: '500ms' } })]),
    ]),
  ],
})
export class CarouselComponent {
  @Input() public slides: { headline?: string; src: string }[];
  @Input() public animationType = AnimationType.Scale;

  public currentSlide = 0;

  public onPreviousClick(): void {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  public onNextClick(): void {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  public checkCarousel(variable: string): boolean {
    return variable.includes('Carousel');
  }
}
