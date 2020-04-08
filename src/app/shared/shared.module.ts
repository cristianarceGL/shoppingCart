import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '@app/shared/material/material.module';
import { ControlsModule } from '@app/shared/controls/controls.module';
import { NumberOnlyDirective } from '@app/shared/directives/number-only.directive';

export * from '@app/shared/material/material.module';
export * from '@app/shared/controls/controls.module';

const toExport = [CommonModule, ControlsModule, MaterialModule];

@NgModule({
  imports: [...toExport],
  declarations: [NumberOnlyDirective],
  exports: [...toExport, NumberOnlyDirective],
  providers: [],
})
export class SharedModule {}
