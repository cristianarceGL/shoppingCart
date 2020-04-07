import { NgModule } from '@angular/core';

import { CarouselModule } from '@app/shared/controls/carousel/carousel.module';
import { CarouselComponent } from '@app/shared/controls/carousel/carousel.component';
import { SnackBarModule } from '@app/shared/controls/snack-bar/snack-bar.module';
import { SnackBarComponent } from '@app/shared/controls/snack-bar/snack-bar.component';

export { CarouselComponent };
export { SnackBarComponent };

const toExport = [CarouselModule, SnackBarModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule {}
