import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { AdminProductFacadeService } from '@app/features/admin-product/services/admin-product-facade.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private adminProductFacadeService: AdminProductFacadeService) {}

  public getProducts(): Observable<any> {
    return this.adminProductFacadeService.getProducts();
  }

  public getCarouselProducts(): Observable<any> {
    return this.adminProductFacadeService.getCarouselProducts();
  }
}
