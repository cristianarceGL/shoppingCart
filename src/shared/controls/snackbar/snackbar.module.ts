import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material/material.module';
import { CommonModule } from '@angular/common';
import { SnackBarControlComponent } from './snackbar.component';
export { SnackBarControlComponent };

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  entryComponents: [SnackBarControlComponent],
  declarations: [SnackBarControlComponent],
  exports: [SnackBarControlComponent],
})
export class SnackBarControlModule {}
