import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddOrderComponent } from './components/add-order/add-order.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { GoodsComponent } from './components/goods/goods.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
const routes: Routes = [ { path:'', component:GoodsComponent } ,
                         { path:'controlpanel',component:DashboardComponent  },
                         {path:'addProduct' ,component:AddProductComponent },
                         {path:'addCustomer' ,component:AddCustomerComponent },
                         {path:'addOrder' ,component:AddOrderComponent },
                         {path:'editProduct/:id' ,component:AddProductComponent },
                         {path:'editcustomer/:id' ,component:AddCustomerComponent },
                         { path:'**',component:NotFoundComponent } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
