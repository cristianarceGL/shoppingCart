import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/shared/shared.module';
import { HeaderModule } from '@app/features/core/navigation/header/header.module';
import { FooterModule } from '@app/features/core/navigation/footer/footer.module';

@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule, HeaderModule, FooterModule],
  exports: [HeaderModule, FooterModule],
})
export class NavigationModule {}
