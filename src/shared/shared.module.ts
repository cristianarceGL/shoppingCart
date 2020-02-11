import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material/material.module';
import { ControlsModule } from '@app/shared/controls/controls.module';

export * from './material/material.module';

const toExport = [CommonModule, ControlsModule, MaterialModule];

@NgModule({
  imports: [...toExport],
  exports: [...toExport],
  providers: [],
})
export class SharedModule {}
