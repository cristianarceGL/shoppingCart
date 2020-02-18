import * as fromRouter from '@ngrx/router-store';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { RouterStateUrl } from '@app/features/core/nav-routing/+state/+nav-routing.reducer';

export class NavRoutingSerializer implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
