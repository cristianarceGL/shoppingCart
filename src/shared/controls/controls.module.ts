import { NgModule } from '@angular/core';

import { CarouselModule } from './carousel/carousel.module';
import { DialogControlModule } from './dialog/dialog.module';
import { SnackBarControlModule } from './snackbar/snackbar.module';

export { CarouselModule } from './carousel/carousel.module';
export { DialogControlModule } from './dialog/dialog.module';
export { SnackBarControlModule } from './snackbar/snackbar.module';

const toExport = [DialogControlModule, SnackBarControlModule, CarouselModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule {}
