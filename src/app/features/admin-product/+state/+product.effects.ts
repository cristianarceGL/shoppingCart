import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable, from, of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import * as productActions from '@app/features/admin-product/+state/+product.actions';
import { ProductService } from '@app/features/admin-product/services/admin-product.service';

@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private productService: ProductService) {}

  public loadProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadProducts),
      switchMap(_ =>
        from(this.productService.getProducts()).pipe(
          map(actionToDispatch => actionToDispatch),
          catchError(errorMessage => of(console.log(`Error when loading products: ${errorMessage}`)))
        )
      )
    )
  );

  public loadCarouselProducts$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(productActions.loadCarouselProducts),
      switchMap(_ =>
        from(this.productService.getCarouselProducts()).pipe(
          map(actionToDispatch => actionToDispatch),
          catchError(errorMessage => of(console.log(`Error when loading carousel products: ${errorMessage}`)))
        )
      )
    )
  );
}
