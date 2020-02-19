import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/shared/shared.module';
import { LayoutComponent } from '@app/features/core/layout/layout.component';
import { NavigationModule } from '@app/features/core/navigation/navigation.module';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, NavigationModule],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule {}
