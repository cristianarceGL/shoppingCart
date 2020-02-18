import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material/material.module';
import { SnackBarControlComponent } from './snackbar-control.component';
import { CommonModule } from '@angular/common';
export { SnackBarControlComponent };

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  entryComponents: [SnackBarControlComponent],
  declarations: [SnackBarControlComponent],
  exports: [SnackBarControlComponent],
})
export class SnackBarControlModule {}
