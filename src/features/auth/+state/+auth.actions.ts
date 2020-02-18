import { createAction, props } from '@ngrx/store';

import { Authenticate, User } from '@app/features/auth/models';

// Happy path
export const login = createAction('[Auth/API] Login', props<{ authenticate: Authenticate }>());
export const logout = createAction('[Auth/API] Logout');
export const getUser = createAction('[Auth/API] Get User', props<{ user?: User }>());
export const loginSuccess = createAction('[Auth/API] Login Success', props<{ user: User }>());
export const authenticated = createAction('[Auth/API] Authenticated', props<{ user?: User }>());

// Un-Happy path
export const notAuthenticated = createAction('[Auth/API] Not Authenticated', (errorMessage = 'Invalid user') => ({
  payload: { errorMessage },
}));
export const loginFailure = createAction('[Auth/API] Login Failure', (errorMessage = 'Error logging in') => ({
  payload: { errorMessage },
}));
