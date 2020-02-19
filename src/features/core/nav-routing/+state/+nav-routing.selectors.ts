import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RouterStateUrl, navRoutingFeatureKey } from '@app/features/core/nav-routing/+state/+nav-routing.reducer';

export const getNavRoutingState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  navRoutingFeatureKey
);

export const getRouterInfo = createSelector(
  getNavRoutingState,
  // tslint:disable-next-line: no-string-literal
  state => state['routerReducer'].state
);

export const getRouterInfoByParameter = (navInfo: RouterStateUrl, parameter: string) => navInfo.params[parameter];
