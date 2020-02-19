import * as NavRoutingReducer from '@app/features/core/nav-routing/+state/+nav-routing.reducer';
import * as NavRoutingEffects from '@app/features/core/nav-routing/+state/+nav-routing.effects';
import * as NavRoutingSelectors from '@app/features/core/nav-routing/+state/+nav-routing.selectors';
import * as NavRoutingSerializer from '@app/features/core/nav-routing/+state/+nav-routing.serializer';

export { NavRoutingReducer, NavRoutingSerializer, NavRoutingEffects, NavRoutingSelectors };
export { NavRoutingStoreModule } from '@app/features/core/nav-routing/+state/+nav-routing-store.module';
