import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/shared/shared.module';
import { HeaderComponent } from '@app/features/core/layout/header/header.component';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
