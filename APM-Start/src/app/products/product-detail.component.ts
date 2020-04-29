import { Component, OnInit } from '@angular/core';

import { Product } from './product';
import { ProductService } from './product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;
  public id: number;

  constructor(
    private productService: ProductService,
    private activeRoute: ActivatedRoute
  ) {


  }

  ngOnInit() {
    this.setProductDetailViewWithSnapshot();

    // using old params
    // this.activeRoute.params
    // .subscribe(this.setProductDetailViewWithOldParams);

    // paramsMap provides more convenience
    /* has(), get(), getall() */
    // ['example', { foo: ['bar', 'baz'] } ] getall('foo')
    // this.activeRoute.paramMap.subscribe(this.setProductDetailViewWithParamMap);

  }
  // begin activeRoute marsupial functions
  setProductDetailViewWithOldParams = (param) => {
    this.id = param.id;
    this.getProduct(this.id);
  }
  setProductDetailViewWithParamMap = (param) => {
    this.getProduct(param.get('id'));
  }

  setProductDetailViewWithSnapshot = () => {
    this.id = +this.activeRoute.snapshot.paramMap.get('id');
    this.getProduct(this.id);
  }
  // ======
  getProduct(id: number) {
    this.productService.getProduct(id).subscribe({
      next: product => this.onProductRetrieved(product),
      error: err => this.errorMessage = err
    });
  }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product) {
      this.pageTitle = `Product Detail: ${this.product.productName}`;
    } else {
      this.pageTitle = 'No product found';
    }
  }
}
