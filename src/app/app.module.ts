import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './products/product-data';

import { AppComponent } from './app.component';
// import { WelcomeComponent } from './home/welcome.component';
// import { PageNotFoundComponent } from './page-not-found.component';

/* Feature Modules */
import { ProductModule } from './products/product.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
// import { RouterModule } from '@angular/router';
// import { ProductListComponent } from './products/product-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 2000 }),
    // explicitly defining the routing module
    // RouterModule.forRoot([
    //     {path: 'home', component: WelcomeComponent},
    //     {path: 'welcome', redirectTo: 'home'}, // all redirects cannot have components
    //     {path: 'products', component: ProductListComponent},
    //     {path: '', redirectTo: 'home', pathMatch: 'full'},
    //     {path: '**', component: PageNotFoundComponent}
    //   ]),
    ProductModule,
    UserModule,
    MessageModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    // WelcomeComponent,
    // PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
