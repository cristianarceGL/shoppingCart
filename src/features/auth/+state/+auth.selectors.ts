import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromAuth from '@app/features/auth/+state/+auth.reducer';

export const getAuthState = createFeatureSelector<fromAuth.AuthState>(fromAuth.authFeatureKey);
export const getUser = createSelector(
  getAuthState,
  state => state.user
);
