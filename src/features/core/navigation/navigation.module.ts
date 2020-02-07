import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@app/shared/shared.module';
import { HeaderModule } from '@app/features/core/navigation/header/header.module';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, HeaderModule],
  exports: [HeaderModule],
})
export class NavigationModule {}
