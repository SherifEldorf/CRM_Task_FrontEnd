import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Good } from '../models/good';
import { GoodsService } from '../services/goods.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(
    private service: GoodsService,
    private router: Router
  ) { }

  num?: number;
  good?: Good;
  goods?: Good[];


  ngOnInit(): void {
    this.num = 0;
    this.getproducts();
  }

  addProduct() {
    this.router.navigate(['addProduct']);
  }

  EditGood(id ?: number ) {
    if (id) {
      this.router.navigate(['/editProduct', id]);
    }
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


  getproducts() {
    this.service.GetAllProducts().subscribe({
      next:list=>{ this.goods = list },
      error:err=>{ console.log(err) }
    })
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

this.service.DeleteAllGoods(ids).subscribe({
next:success=>
{
this.getproducts();
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

