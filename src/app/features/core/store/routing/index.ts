import * as RoutingReducer from '@app/features/core/store/routing/routing.reducer';
import * as RoutingEffects from '@app/features/core/store/routing/routing.effects';
import * as RoutingSelectors from '@app/features/core/store/routing/routing.selectors';
import * as RoutingSerializer from '@app/features/core/store/routing/routing.serializer';

export { RoutingReducer, RoutingSerializer, RoutingEffects, RoutingSelectors };
export { RoutingStoreModule } from '@app/features/core/store/routing/routing-store.module';
