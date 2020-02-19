import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { ActionStatus } from '@app/features/core/common/enums/general.enum';
import { NotificationActions } from '@app/features/core/notifications/+state';
import { SnackBarConfig } from '@app/shared/controls/snackbar-control/snackbar-control.model';
import { NotificationState } from '@app/features/core/notifications/+state/+notification.reducer';

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
