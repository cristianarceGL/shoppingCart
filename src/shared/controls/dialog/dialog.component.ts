import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogData } from './dialog.model';

@Component({
  selector: 'sc-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogControlComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
