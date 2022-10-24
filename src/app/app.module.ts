import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GoodsComponent } from './components/goods/goods.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { SalesComponent } from './sales/sales.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddOrderComponent } from './components/add-order/add-order.component';


@NgModule({
  declarations: [
    AppComponent,
    GoodsComponent,
    NotFoundComponent,
    NavbarComponent,
    DashboardComponent,
    ProductsComponent,
    CustomersComponent,
    SalesComponent,
    AddProductComponent,
    AddCustomerComponent,
    AddOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
