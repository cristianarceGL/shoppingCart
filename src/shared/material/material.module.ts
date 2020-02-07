import { NgModule } from '@angular/core';

import { MatProgressSpinnerModule, MatToolbarModule } from '@angular/material';

const modules = [MatProgressSpinnerModule, MatToolbarModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
