import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { SnackBarConfig } from '@app/shared/controls/snackbar/snackbar.model';
import { NotificationActions } from './+state';
import { NotificationState } from './+state/+notification.reducer';
import { ActionStatus } from '../common/enums/general.enum';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor(private store: Store<NotificationState>) {}

  public showSnackBar(message: string, actionStatus: ActionStatus): void {
    this.store.dispatch(
      NotificationActions.snackBarOpen({
        snackbar: { message, config: new SnackBarConfig(actionStatus) },
      })
    );
  }
}
