import * as OrderReducer from '@app/features/admin-order/+state/+order.reducer';
import * as OrderActions from '@app/features/admin-order/+state/+order.actions';
import * as OrderSelectors from '@app/features/admin-order/+state/+order.selectors';

export { OrderStoreModule } from '@app/features/admin-order/+state/+order-store.module';
export { OrderActions, OrderSelectors, OrderReducer };
