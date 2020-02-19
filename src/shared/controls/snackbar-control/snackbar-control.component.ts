import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarData } from './snackbar-control.model';

@Component({
  selector: 'sc-snackbar',
  templateUrl: './snackbar-control.component.html',
  styleUrls: ['./snackbar-control.component.scss'],
})
export class SnackBarControlComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarControlComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {}
}
