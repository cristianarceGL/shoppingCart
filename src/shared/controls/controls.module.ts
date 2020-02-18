import { NgModule } from '@angular/core';

import { DialogControlModule } from './dialog-control/dialog-control.module';
import { SnackBarControlModule } from './snackbar-control/snackbar-control.module';

export { DialogControlModule } from './dialog-control/dialog-control.module';
export { SnackBarControlModule } from './snackbar-control/snackbar-control.module';

const toExport = [DialogControlModule, SnackBarControlModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule {}
