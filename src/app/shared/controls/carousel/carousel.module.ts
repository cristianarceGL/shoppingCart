import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material/material.module';
import { CarouselComponent } from '@app/shared/controls/carousel/carousel.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  entryComponents: [CarouselComponent],
  declarations: [CarouselComponent],
  exports: [CarouselComponent],
})
export class CarouselModule {}
