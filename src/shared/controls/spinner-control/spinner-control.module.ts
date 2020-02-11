import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@app/shared/material';
import { SpinnerControlComponent } from './spinner-control.component';

@NgModule({
  declarations: [SpinnerControlComponent],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [SpinnerControlComponent],
})
export class SpinnerControlModule {}
