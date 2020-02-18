import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { getUser } from '@app/features/auth/+state/+auth.selectors';
import { AuthState } from '@app/features/auth/+state/+auth.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthListSelector {
  constructor(private store: Store<AuthState>) {}

  public getUser() {
    return this.store.select(getUser);
  }
}

describe('Auth Selectors', () => {
  it('should return call the getUser selector', () => {
    const store = jasmine.createSpyObj<Store<AuthState>>('store', ['select']);

    const authListSelector = new AuthListSelector(store);
    authListSelector.getUser();

    expect(store.select).toHaveBeenCalledWith(getUser);
  });
});
