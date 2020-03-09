import { MatDialogConfig } from '@angular/material';

export interface DialogData {
  icon: string;
  title: string;
  body: string;
  action: string;
}

export const successDialogData: DialogData = {
  icon: 'check_circle',
  title: 'Success',
  body: '',
  action: 'Accept',
};

export class DialogConfig extends MatDialogConfig {
  constructor(dialogData: DialogData) {
    super();
    this.disableClose = true;
    this.autoFocus = true;
    this.data = dialogData;
  }
}
