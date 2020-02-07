import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule } from '@angular/material';

const modules = [MatProgressSpinnerModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
