import { Action, createReducer, on } from '@ngrx/store';

import * as notificationActions from '@app/features/core/notifications/+state/+notification.actions';

export const notificationFeatureKey = 'notification';

export interface NotificationState {
  showSnackBar: boolean;
}

export const initialState: NotificationState = {
  showSnackBar: false,
};

const reducer = createReducer(
  initialState,
  on(notificationActions.snackBarOpen, state => ({
    ...state,
    showSnackBar: true,
  })),
  on(notificationActions.snackBarClose, state => ({
    ...state,
    showSnackBar: false,
  }))
);

export function notificationReducer(state: NotificationState | undefined, action: Action) {
  return reducer(state, action);
}
