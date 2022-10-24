import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Good } from 'src/app/models/good';
import { GoodsService } from 'src/app/services/goods.service';
import { Customer } from '../../models/Customer';
import { Order } from '../../models/Order';
import { CustomerService } from '../../services/customer.service';
import { SalesService } from '../../services/sales.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  constructor( private service:SalesService , private router:Router , private customerservice : CustomerService
    , private produtservices : GoodsService ,     private fb: FormBuilder,)
    { }
  title?:string;
  btntitle?:string;
  message?:string;
  isEditMode?:boolean;
  id ?:string;
  productId?:number;
  newOrder=new Order;
  Customers?:Customer[];
  products?:Good[];
  ProductsIds?: number[];
  btnProduct?: string;
  isAddProduct?:boolean;

  isProdutExists ?: boolean;

  OrderForm= new FormGroup({
    Date: new FormControl(''),
    status: new FormControl(false),
    customerId: new FormControl(0),
    tax: new FormControl(''),
    subtotal: new FormControl(''),
    grandtotal: new FormControl(''),
    shippingAddress: new FormControl(''),
    pillingAddress: new FormControl(''),
    productId: new FormControl([0]),

  });


  ngOnInit(): void {
    this.title=' Add new Order   ' ;
    this.btntitle='Add'
    this.message='';
    this.btnProduct=' add Product '
    this.isAddProduct = false;
    this.ProductsIds=[];


    this.OrderForm = this.fb.group({
      Date: new FormControl(''),
      status: new FormControl(false),
      customerId: new FormControl(0),
      tax: new FormControl(''),
      subtotal: new FormControl(''),
      grandtotal: new FormControl(''),
      shippingAddress: new FormControl(''),
      pillingAddress: new FormControl(''),
      productId: new FormControl(0),
      productControl: this.fb.array([
        this.myProductGroup(0, '')
      ])
    })
    this.customerservice.GetAllCustomers().subscribe({
      next : list=> { this.Customers=list  },
      error: err=> { console.log(err) }
    })
    this.GetProducts();

    }
  GetProducts()
  {
    this.produtservices.GetAllProducts().subscribe( {
      next : products =>{ this.products = products },
      error: err=>{ console.log(err) }
    } )


  }
  AddProduct() {
    if (this.btnProduct === 'اضافة ممثل') {
      this.isAddProduct = true;
      this.btnProduct = 'اخفاء';
    } else {
      this.isAddProduct = false;
      this.btnProduct = 'اضافة ممثل';
    }
  }
  get productControl() {
    return this.OrderForm.get('productControl') as FormArray;
  }
  onMyClick(frmGroup: number) {
    var product = this.OrderForm.get(['productControl', frmGroup])?.value;
    var id = product.productId;
    console.log(this.ProductsIds);

    if( this.ProductsIds )
    for (let i = 0; i < this.ProductsIds.length; i++) {
      var prodId = this.ProductsIds[i];
      if (prodId === id) {
        this.ProductsIds.splice(i, 1);
      }
    }
  }
  AddOrder()
  {

     const fd = new FormData();
     fd.append('customerId', this.OrderForm.value.customerId);
     fd.append('Date', this.OrderForm.value.Date );
     fd.append('subtotal', this.OrderForm.value.subtotal);
     fd.append('tax',this.OrderForm.value.tax);
     fd.append('status',this.OrderForm.value.status);
     fd.append('shippingAddress', this.OrderForm.value.shippingAddress);
     fd.append('pillingAddress', this.OrderForm.value.pillingAddress);
     if( this.ProductsIds )
     for (let i = 0; i < this.ProductsIds.length; i++) {
       fd.append('productId[]', this.ProductsIds[i].toString());
     }
     console.log(this.OrderForm.value.customerId)
     console.log(fd);
    this.service.AddOrder(fd).subscribe({
      next:suceess=>{ this.message='تمت اضافة الصنف بنجاح' ; this.OrderForm.reset() },
      error:err=>{    console.log(err)  }
    });}




  gotoList()
  {
    sessionStorage.setItem('order','order')
    this.router.navigate(['controlpanel'])
  }
 onRoleChange()
  {
    this.id=this.OrderForm.value.customerId;
    console.log(this.id)
  }
  myProductGroup(id: number, name: string ): FormGroup {
    return this.fb.group({
      productId: id,
      ProductName: name,
    })
  }

  OnProductChange() {
    const id = this.OrderForm.value.productId;
    var txt = $('#productId option:selected').html();
    if (id > 0 && txt && this.ProductsIds) {
      for (let i = 0; i < this.ProductsIds.length ; i++) {
        const prodId = this.ProductsIds[i];
        if (prodId === id) {
          console.log('exists ....');
          this.isProdutExists = true;
          return;
        }
      }

      this.isProdutExists = false;
      this.ProductsIds.push(id);
      console.log(this.myProductGroup(id,txt));

      (<FormArray>this.OrderForm.get('productControl')).push(this.myProductGroup(id, txt));
    }
  }
}
