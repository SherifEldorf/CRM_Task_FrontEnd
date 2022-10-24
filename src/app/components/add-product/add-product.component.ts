import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GoodsService } from '../../services/goods.service';
import { Good } from 'src/app/models/good';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor( private service:GoodsService , private router:Router,private activatedRoute:ActivatedRoute ) { }
  title?:string;
  btntitle?:string;
  message?:string;
  isEditMode?:boolean;
  id ?:string;
  newGood=new Good;
  editedModel?:Good;

  GoodForm= new FormGroup({
    GoodName: new FormControl('',[Validators.required,Validators.maxLength(150)]),
    GoodDeccription: new FormControl('',[Validators.required,Validators.maxLength(150)]),
    GoodPrice: new FormControl('',[Validators.required,Validators.maxLength(150)]),
  });
  messageValidate = {

    productName : {
      required: ' اسم المنتج مطلوب',
      max:' يجب أن لا يتخطى اسم الصنف 150 حرف '

    }
  };
  ngOnInit(): void {
    this.title=' add new product  ' ;
    this.btntitle='Add'
    this.message='';
    this.isEditMode =false;


    this.activatedRoute.paramMap.subscribe({
      next:param=>{

        var id =param.get('id');

        if(id )
        {
              this.title='  Edit Product ';
              this.btntitle=' Save ';
              this.isEditMode=true;
              this.id= id;
              this.service.GetProduct(this.id).subscribe({
                next:product=>{ this.editedModel=product
                  this.GoodForm.patchValue({
                    GoodName:this.editedModel?.name,
                    GoodPrice:this.editedModel?.price,
                    GoodDeccription:this.editedModel?.description,

                  })
                },
                error:err=>{ console.log(err) }
              })
        }
      },error:err=>{
        console.log(err);
      }
    })
  }
  AddGood()
  {
    if (this.isEditMode== false){
      var name = this.GoodForm.value.GoodName;
      var Decription = this.GoodForm.value.GoodDeccription;
      var price = this.GoodForm.value.GoodPrice;
      this.newGood.name=name;
      this.newGood.price=price;
      this.newGood.description=Decription;
    this.service.AddProduct(this.newGood).subscribe({
      next:suceess=>{ this.message='تمت اضافة المنتج بنجاح' ; this.GoodForm.reset() },
      error:err=>{    this .message = err  }
    });}
    else
    {
      var name =this.GoodForm.value.CatName;
      this.newGood.name=name;
      if(this.id)
      this.newGood.id= parseInt(this.id  );
      this.newGood.name= this.GoodForm.value.GoodName;
      this.newGood.price= this.GoodForm.value.GoodPrice;
      this.newGood.description= this.GoodForm.value.GoodDeccription;
      this.service.EditProduct(this.newGood).subscribe({
        next:suceess=>{ this.message='تمت تعديل المنتج بنجاح' ; this.gotoList() },
        error:err=>{    this .message = err  }
      });

    }
  }

  gotoList()
  {
    sessionStorage.setItem('cat','cat')
    this.router.navigate(['controlpanel'])
  }

}


