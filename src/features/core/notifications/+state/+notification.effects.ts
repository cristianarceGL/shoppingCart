import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { map, tap, delay } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MatSnackBar } from '@app/shared/material/material.module';
import * as notificationActions from '@app/features/core/notifications/+state/+notification.actions';

@Injectable()
export class NotificationEffects {
  constructor(private actions$: Actions, private matSnackBar: MatSnackBar) {}

  showSnackbar$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(notificationActions.snackBarOpen),
      map((action: any) => action.snackbar),
      tap(snackbar => this.matSnackBar.open(snackbar.message, snackbar.action, snackbar.config)),
      delay(4000),
      map(() => notificationActions.snackBarClose())
    )
  );

  closeSnackbar$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(notificationActions.snackBarClose),
        tap(_ => this.matSnackBar.dismiss())
      ),
    { dispatch: false }
  );
}
