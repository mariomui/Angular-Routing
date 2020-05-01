import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';


import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { ProductResolverService } from '../core/services/product-resolver.service';
import { ProductEditInfoComponent } from './product-edit/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit/product-edit-tags.component';
import { NgForm } from '@angular/forms';
import { ProductListResolverService } from '../core/services/product-list-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: 'products',
        children: [
          { path: '', component: ProductListComponent, resolve: { resolvedData: ProductListResolverService } },
          { path: ':id', component: ProductDetailComponent, resolve: { resolvedData: ProductResolverService } },
          {
            path: ':id/edit', component: ProductEditComponent, resolve: { resolvedData: ProductResolverService },
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full' }, // top down look
              { path: 'info', component: ProductEditInfoComponent }, // info
              { path: 'tags', component: ProductEditTagsComponent }, // something else
            ]
          },
        ]
      },

    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
  ]
})
export class ProductModule { }
