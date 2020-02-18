import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { DialogData } from './dialog-control.model';

@Component({
  selector: 'sc-dialog-control',
  templateUrl: './dialog-control.component.html',
  styleUrls: ['./dialog-control.component.scss'],
})
export class DialogControlComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogControlComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
}
