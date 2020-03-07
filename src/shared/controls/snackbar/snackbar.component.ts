import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material';
import { SnackBarData } from './snackbar.model';

@Component({
  selector: 'sc-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss'],
})
export class SnackBarControlComponent {
  constructor(
    public snackBarRef: MatSnackBarRef<SnackBarControlComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: SnackBarData
  ) {}
}
