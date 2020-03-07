import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material/material.module';
import { ControlsModule } from '@app/shared/controls/controls.module';
import { NumberOnlyDirective } from './directives/number-only.directive';

export * from './material/material.module';

const toExport = [CommonModule, ControlsModule, MaterialModule];

@NgModule({
  imports: [...toExport],
  declarations: [NumberOnlyDirective],
  exports: [...toExport, NumberOnlyDirective],
  providers: [],
})
export class SharedModule {}
