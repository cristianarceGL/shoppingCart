import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material/material.module';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './carousel.component';
export { CarouselComponent };

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  entryComponents: [CarouselComponent],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
