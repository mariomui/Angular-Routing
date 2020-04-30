import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Product, ProductResolved } from 'src/app/products/product';
import { Observable, of } from 'rxjs';
import { ProductService } from 'src/app/products/product.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
// Providing a singleton service
// There are two ways to make a service a singleton in Angular:

// Set the providedIn property of the @Injectable() to "root".
// Include the service in the AppModule or in a module that is only imported by the AppModule
export class ProductResolverService implements Resolve<Product> {
  // Resolve is an typescript interface
  // https://angular.io/api/router/Resolve
  // interface Resolve<T> {
  //   resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> | Promise<T> | T
  // }
  constructor(private productService: ProductService) {

  }


  // these two snapshots imported from router arent objects to be sued, they are interfaces and only describes the route and the state.
  /**
   *
   * @param route Activated Route snapshot is the current activatedRoute
   * @param state // TODO Explain what a Router StateSnapshot is.
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ProductResolved> {
    const id = route.paramMap.get('id');
    // resolve must called during some kind of routing process.
    if (isNaN(+id)) {
      const message = `Product id was not a number: ${id}`;
      console.error(message);
      return;
    }
    return this.productService.getProduct(+id)
      .pipe(
        map(product => ({ product })),
        catchError(err => {
          const message = `Retrieval error: ${err}`;
          return of({ product: null, err: message });
        })
      );
  }
}
