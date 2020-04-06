import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProductFacadeService } from '@app/features/product/services/product-facade.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private adminProductFacadeService: ProductFacadeService) {}

  public getProducts(): Observable<any> {
    return this.adminProductFacadeService.getProducts();
  }

  public getCarouselProducts(): Observable<any> {
    return this.adminProductFacadeService.getCarouselProducts();
  }
}
