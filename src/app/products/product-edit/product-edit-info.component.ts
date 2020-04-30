import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm, { static: false }) productForm: NgForm;

  errorMessage: string;
  public product: Product;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.product = this.activeRoute.parent.snapshot.data['resolvedData'].product;
    this.activeRoute.parent.data.subscribe(({ resolvedData }) => {
      const { product, error } = resolvedData;
      this.product = product || '';
      this.errorMessage = error;
      if (this.productForm) {
        this.productForm.reset();
      }
    });


  }
}
