import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductListComponent } from './products/product-list.component';
// import { ProductDetailComponent } from './products/product-detail.component';
// import { ProductEditComponent } from './products/product-edit/product-edit.component';



@NgModule({
  declarations: [
    // WelcomeComponent,
    // PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([
        {path: 'home', component: WelcomeComponent},
        {path: 'welcome', redirectTo: 'home'}, // all redirects cannot have components
        {path: 'products', component: ProductListComponent},
        {path: '', redirectTo: 'home', pathMatch: 'full'},
        {path: '**', component: PageNotFoundComponent}
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
