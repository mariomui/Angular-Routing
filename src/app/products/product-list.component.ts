import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }

  filteredProducts: Product[] = [];
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // this.activeRoute.queryParams.
    //   pipe(filter(params => params.filterBy && params.filterBy.length > 0))
    //   .subscribe(({ filterBy, showImage }) => {
    //     this.listFilter = filterBy;
    //     this.showImage = showImage;
    //     this.filteredProducts = this.performFilter(this.listFilter);
    //   });
    this.listFilter = this.activeRoute.snapshot.queryParamMap.get('filterBy') || '';
    this.showImage = JSON.parse(this.activeRoute.snapshot.queryParamMap.get('showImage'));
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products;
        this.filteredProducts = this.performFilter(this.listFilter);
      },
      error: err => this.errorMessage = err
    });
  }

  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }
  public editProduct(event, product) {
    this.router.navigate(['/products', product.id, 'edit']);
  }
}
