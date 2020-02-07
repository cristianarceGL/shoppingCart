import { NgModule } from '@angular/core';

import { SpinnerControlModule } from './spinner-control/spinner-control.module';

const toExport = [SpinnerControlModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
})
export class ControlsModule {}
