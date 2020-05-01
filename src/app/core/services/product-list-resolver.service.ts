import { Injectable, OnInit } from '@angular/core';
import { ProductResolved, Product } from '../../products/product';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable } from 'rxjs';
import { ProductService } from '../../products/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<Product[]> {
  private products: Product[];
  constructor(private productService: ProductService) {

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product[]> {
    return this.productService.getProducts();
    // this.productService.getProduct(t)
  }
}
