import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/customer.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  constructor( private service:CustomerService , private router :Router ) { }
  customers?:Customer[];
  num?:number;

  ngOnInit(): void {
    this.num=0;
   this.GetaAllCustomers();
  }
  GetaAllCustomers()
  {
    this.service.GetAllCustomers().subscribe({
      next:list=>{
        this.customers=list;
        console.log(this.customers)
      }, error:err=>{
        console.log(err);
      }
    })
  }

  EditCustomerClick( id?:number  )
  {
    this.router.navigate(['editcustomer/',id])
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
  addCustomer()
  {
    this.router.navigate(['addCustomer']);

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

      this.service.DeleteAllCustomers(ids).subscribe({
        next:success=>
        {
          this.GetaAllCustomers();
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

