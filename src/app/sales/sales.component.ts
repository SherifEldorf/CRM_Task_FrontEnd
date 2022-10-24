import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../models/Order';
import { CustomerService } from '../services/customer.service';
import { SalesService } from '../services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  constructor( private service: SalesService , private router :Router ,private customerServ :CustomerService ) { }
  orders?:Order[];
  num?:number;
  customerPhone?:number;
  grandtotalvalue?: number;

  ngOnInit(): void {
    this.num=0;
   this.GetaAllOrders();
  }
  GetaAllOrders()
  {
    this.service.GetAllOrders().subscribe({
      next:list=>{
        this.orders=list;
        console.log(this.orders)
      }, error:err=>{
        console.log(err);
      }
    })
  }

  EditCustomerClick( id?:number  )
  {
    this.router.navigate(['editcustomer/',id])
  }
  grandtotal( subtotal ?: number , tax ?: number )
  {
    if( subtotal && tax )
     this.grandtotalvalue = subtotal - tax
    return this.grandtotalvalue;
  }
  SelectAll()
  {
    var tble=$('#tbl');
    var header= tble.find('thead .ckheader');
    var item=tble.find('tbody .ckitem');

    $(function()
    {
      item.on('change',function(){
        if($(this).is(':checked'))
        {
          $(this).closest('tr').addClass('NewRowColor');

        }
        else
        {
          $(this).closest('tr').removeClass('NewRowColor');

        }
      });
    });

     header.on('change', function()
    {
     // var m =$(this).is(':checked')
      var c =header.is(':checked');
      item.prop("checked",c);
      item.trigger('check');

      if($(this).is(':checked'))
      {
        $(item).closest('tr').addClass('NewRowColor');

      }
      else
      {
        $(item).closest('tr').removeClass('NewRowColor');

      }

    } )

  }
  addOrder()
  {
    this.router.navigate(['addOrder']);

  }
  IsDelete()
  {
    var checkboxes=document.getElementsByClassName('ckitem');
    if( checkboxes.length>0 )
    {
      for (let i = 0; i < checkboxes.length; i++) {
    if( $(checkboxes[i]).is(':checked') )
    {
      return true
    }
      }
    }
    return false;

  }

  DeleteCount()
  {
    var count=$(".ckitem:checked").length;
    this.num=count;

  }

   DeleteConfirm()
  {
    var checkboxes=document.getElementsByClassName('ckitem');
    if( checkboxes.length>0 )
    {
      var ids =[];
      for (let i = 0; i < checkboxes.length; i++) {
    if( $(checkboxes[i]).is(':checked') )
    {
      var id =  $(checkboxes[i]).val();
      ids.push(id);
    }
      }

      this.service.DeleteAllOrders(ids).subscribe({
        next:success=>
        {
          this.GetaAllOrders();
          $("#btnClose").trigger("click")
        },error:err=>{
          console.log(err);
        }
      })

      console.log(ids);
    }
    return false;
  }

}




