import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { State } from '@app/features/core/store/routing/routing.reducer';
import { Extras } from '@app/features/core/store/routing/routing.actions';
import * as authActions from '@app/features/core/store/routing/routing.actions';

const extras: Extras = {
  path: ['/home'],
};

@Injectable({ providedIn: 'root' })
export class RoutingListActions {
  constructor(private store: Store<State>) {}

  public go(): void {
    this.store.dispatch(authActions.GO({ payload: extras }));
  }

  public back(): void {
    this.store.dispatch(authActions.BACK());
  }

  public forward(): void {
    this.store.dispatch(authActions.FORWARD());
  }
}

describe('AuthListActions', () => {
  it('should dispatch go action', () => {
    const expectedAction = authActions.GO({ payload: extras });
    const store = jasmine.createSpyObj<Store<State>>('store', ['dispatch']);
    const authListActions = new RoutingListActions(store);

    authListActions.go();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch back action', () => {
    const expectedAction = authActions.BACK();
    const store = jasmine.createSpyObj<Store<State>>('store', ['dispatch']);
    const authListActions = new RoutingListActions(store);

    authListActions.back();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });

  it('should dispatch forward action', () => {
    const expectedAction = authActions.FORWARD();
    const store = jasmine.createSpyObj<Store<State>>('store', ['dispatch']);
    const authListActions = new RoutingListActions(store);

    authListActions.forward();
    expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
  });
});