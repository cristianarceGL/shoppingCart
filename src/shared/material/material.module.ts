import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
} from '@angular/material';

export {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatSnackBarConfig,
  MatSnackBar,
  MatRadioChange,
  MatStepper,
  MatSelect,
  MatCheckbox,
} from '@angular/material';

export { StepperSelectionEvent } from '@angular/cdk/stepper';

const modules = [
  FlexLayoutModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatListModule,
  MatIconModule,
  MatToolbarModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatMenuModule,
  MatStepperModule,
  MatSelectModule,
  MatCheckboxModule,
  MatRadioModule,
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
