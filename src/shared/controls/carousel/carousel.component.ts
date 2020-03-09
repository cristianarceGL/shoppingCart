import { Component, Input } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { AnimationType, scaleIn, scaleOut, fadeIn, fadeOut } from './carousel.animations';

@Component({
  selector: 'sc-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('slideAnimation', [
      /* scale */
      transition('void => scale', [useAnimation(scaleIn, { params: { time: '500ms' } })]),
      transition('scale => void', [useAnimation(scaleOut, { params: { time: '500ms' } })]),

      /* fade */
      transition('void => fade', [useAnimation(fadeIn, { params: { time: '500ms' } })]),
      transition('fade => void', [useAnimation(fadeOut, { params: { time: '500ms' } })]),
    ]),
  ],
})
export class CarouselComponent {
  @Input() public slides: { headline?: string; src: string }[];
  @Input() public animationType = AnimationType.Fade;

  public currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.slides.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.slides.length ? 0 : next;
  }

  checkCarousel(variable: string) {
    return variable.includes('Carousel');
  }
}
