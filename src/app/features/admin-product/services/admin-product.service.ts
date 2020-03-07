import { Observable, of, from } from 'rxjs';
import { Injectable } from '@angular/core';
import { AdminProductFacadeService } from './admin-product-facade.service';

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

  public showSuccessMessage(message: string = 'Information updated!'): Observable<boolean> {
    return this.adminProductFacadeService.showSuccessMessage(message);
  }

  public showFailureMessage(message: string = 'Error when updating!'): Observable<boolean> {
    return this.adminProductFacadeService.showFailureMessage(message);
  }
}
