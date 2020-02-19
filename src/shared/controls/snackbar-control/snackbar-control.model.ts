import { MatSnackBarConfig } from '@angular/material';
import { ActionStatus } from '@app/features/core/common/enums/general.enum';

export interface SnackBarData {
  icon: string;
  color: [string];
}

export const successTemplate: SnackBarData = {
  icon: 'success_outline',
  color: ['snackbar-success'],
};

export const failureTemplate: SnackBarData = {
  icon: 'error_outline',
  color: ['snackbar-failure'],
};

export class SnackBarConfig extends MatSnackBarConfig {
  constructor(typeSnackBar: string) {
    const snackBarData = typeSnackBar === ActionStatus.Success ? successTemplate : failureTemplate;
    super();
    this.horizontalPosition = 'center';
    this.verticalPosition = 'top';
    this.panelClass = snackBarData.color;
    this.data = snackBarData;
  }
}
