import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@app/shared/material/material.module';
import { MatSnackBarComponent } from '@app/shared/controls/mat-snack-bar/mat-snack-bar.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [MatSnackBarComponent],
  exports: [MatSnackBarComponent],
  providers: [MatSnackBarComponent],
})
export class MatSnackBarModule {}
