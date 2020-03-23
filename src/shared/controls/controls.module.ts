import { NgModule } from '@angular/core';

import { CarouselModule } from '@app/shared/controls/carousel/carousel.module';
import { CarouselComponent } from '@app/shared/controls/carousel/carousel.component';
import { MatSnackBarModule } from '@app/shared/controls/mat-snack-bar/mat-snack-bar.module';
import { MatSnackBarComponent } from '@app/shared/controls/mat-snack-bar/mat-snack-bar.component';

export { CarouselComponent };
export { MatSnackBarComponent };

const toExport = [CarouselModule, MatSnackBarModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule {}
