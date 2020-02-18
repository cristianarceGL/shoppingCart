import { Params } from '@angular/router';
import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

export const navRoutingFeatureKey = 'nav-routing';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};
