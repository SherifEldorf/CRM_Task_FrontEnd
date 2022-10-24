import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Good } from 'src/app/models/good';
import { GoodsService } from 'src/app/services/goods.service';

@Component({
  selector: 'app-goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  goods:any;
  datasource:any ;
  add=-1;

  constructor( private goodserv:GoodsService  ) {

   }
  ngOnInit(): void {
    this.goodserv.GetAllProducts().subscribe({
      next: list => { this.goods=list },
      error:err=> { console.log(err) }
    })

    }
  addToCarte(index:number)
  {
    this.add=+index;
  }

  buy( amount :any  )
  {
    let selecteddata=this.goods[this.add];
    let data={
      name:selecteddata.name,
      amount: +amount,
      price:selecteddata.price
    }
    console.log(data);
  }

}
