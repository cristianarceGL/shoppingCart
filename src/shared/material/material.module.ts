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
} from '@angular/material';

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
];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
