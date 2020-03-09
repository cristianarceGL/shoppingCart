import { createAction, props } from '@ngrx/store';

import { MatSnackBarConfig } from '@app/shared/material/material.module';

// Happy path
export const snackBarOpen = createAction(
  '[Notification/API] Snackbar Open',
  props<{
    snackbar: {
      message: string;
      action?: string;
      config?: MatSnackBarConfig;
    };
  }>()
);
export const snackBarClose = createAction('[Notification/API] Snackbar Close');
