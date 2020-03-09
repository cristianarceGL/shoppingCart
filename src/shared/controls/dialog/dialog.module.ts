import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@app/shared/material/material.module';
import { DialogControlComponent } from './dialog.component';
import { CommonModule } from '@angular/common';
export { DialogControlComponent };

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  entryComponents: [DialogControlComponent],
  declarations: [DialogControlComponent],
  exports: [DialogControlComponent],
})
export class DialogControlModule {}
