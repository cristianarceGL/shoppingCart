import * as ProductReducer from '@app/features/admin-product/+state/+product.reducer';
import * as ProductActions from '@app/features/admin-product/+state/+product.actions';
import * as ProductSelectors from '@app/features/admin-product/+state/+product.selectors';

export { ProductStoreModule } from '@app/features/admin-product/+state/+product-store.module';
export { ProductActions, ProductSelectors, ProductReducer };
