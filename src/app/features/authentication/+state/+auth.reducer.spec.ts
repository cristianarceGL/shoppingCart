import { user } from '@app/mockdata/data/models-data';
import { User } from '@app/features/authentication/models';
import * as authActions from '@app/features/authentication/+state/+auth.actions';
import { authReducer, initialState } from '@app/features/authentication/+state/+auth.reducer';

describe('Auth Reducer', () => {
  describe('check the constructor', () => {
    it('should return a valid user object', () => {
      const result = new User('shoppingUserId', 'Shopping User', 'shopping@gorilla.com', '50688776655', 'TBD');
      expect(result.email).toBe(user.user.email);
    });

    it('should return a valid user object empties', () => {
      const result = new User('shoppingUserId', 'Shopping User', 'shopping@gorilla.com');
      expect(result.email).toBe(user.user.email);
    });

    it('should return a valid user object nulls', () => {
      const result = new User('shoppingUserId', 'Shopping User', 'shopping@gorilla.com', null, null);
      expect(result.email).toBe(user.user.email);
    });
  });

  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;
      const result = authReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('when executing a login action', () => {
    it('should return loading true', () => {
      const newState = authReducer(initialState, authActions.login);
      expect(newState.loading).toBe(true);
    });
  });

  describe('when executing getUser action', () => {
    it('should return the current user and the loading should be false', () => {
      const newState = authReducer(initialState, authActions.getUser(user));
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(user.user);
    });
  });

  describe('when executing a logout action', () => {
    it('should return loading true', () => {
      const newState = authReducer(initialState, authActions.logout);
      expect(newState.loading).toBe(true);
    });
  });

  describe('when executing authenticated action', () => {
    it('should return the current user and the loading should be false', () => {
      const newState = authReducer(initialState, authActions.authenticated(user));
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(user.user);
    });
  });

  describe('when executing notAuthenticated action', () => {
    it('should return the current user and the loading should be false', () => {
      const newState = authReducer(initialState, authActions.notAuthenticated());
      expect(newState.loading).toBe(false);
      expect(newState.user).toBe(null);
      expect(newState).toEqual(initialState);
    });
  });

  describe('when executing loginSuccess action', () => {
    it('should return the current user and the loading should be false', () => {
      const newState = authReducer(initialState, authActions.loginSuccess(user));
      expect(newState.loading).toBe(false);
      expect(newState.user).toEqual(user.user);
    });
  });

  describe('when executing loginFailure action', () => {
    it('should return the current user and the loading should be false', () => {
      const newState = authReducer(initialState, authActions.loginFailure());
      expect(newState.loading).toBe(false);
      expect(newState.user).toBe(null);
      expect(newState).toEqual(initialState);
    });
  });
});
