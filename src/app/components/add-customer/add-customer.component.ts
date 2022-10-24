import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../../models/Customer';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {

  constructor( private service:CustomerService , private router:Router,private activatedRoute:ActivatedRoute ) { }
  messageValidate = {
    username: {
      required: 'اسم المستخدم مطلوب',
    },
    email: {
      required: ' البريد الالكترونى مطلوب',
      notValid: 'البريد الالكترونى المدخل غير صحيح',
    },

  };

  registrationMessage?: string;
  errorMessage?: string;
  CustomerForm = new FormGroup({
    FirstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
     LastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),

    phone: new FormControl(''),
    Code : new FormControl(''),
    billingAddress : new FormControl(''),
    AddressLine2 : new FormControl(''),
    Activated: new FormControl(false),
  });

  Newcustomer = new Customer();
  isBusy?: boolean;
  users?: Customer[];
  title?:string;
  btntitle?:string;
  userData?:Customer;
  isEditMode?:boolean;
  editedModel=new Customer();
  id?:string;
  message?:string;
  Activated?: boolean ;
  ngOnInit(): void {
    this.title=' اضافة زبون جديد ' ;
    this.btntitle='اضافة'
    this.message='';
    this.registrationMessage=''
    this.errorMessage='';
    this.isEditMode =false;


    this.activatedRoute.paramMap.subscribe({
      next:param=>{

        var id =param.get('id');

        if(id )
        {
              this.title=' تعديل  بيانات المستخدم ';
              this.btntitle=' تعديل وحفظ ';
              this.isEditMode=true;
              this.id= id;
              this.service.GetCustomer(this.id).subscribe({
                next:product=>{ this.editedModel=product;
                  this.CustomerForm.patchValue({
                    FirstName:this.editedModel?.firstName,
                    LastName:this.editedModel?.lastName,
                    email:this.editedModel?.email,
                    phone:this.editedModel?.phone,
                    Code:this.editedModel?.code,
                    billingAddress:this.editedModel?.billingAddress,
                    AddressLine2:this.editedModel?.addressLine2,
                    Activated: this.editedModel?.activeted


                  })
                  console.log(this.editedModel)
                },
                error:err=>{ console.log(err) }
              })
        }
      },error:err=>{
        console.log(err);
      }
    })
  }
  AddCustomer()
  {
    var FirstName = this.CustomerForm.value.FirstName;
      var LastName = this.CustomerForm.value.LastName;
      var Email  = this.CustomerForm.value.email ;
      var Code  = this.CustomerForm.value.Code ;
      var Phone  = this.CustomerForm.value.phone ;
      var billingAddress   = this.CustomerForm.value.billingAddress  ;
      var AddressLine2    = this.CustomerForm.value.AddressLine2   ;
      var Activated    = this.CustomerForm.value.Activated   ;

    if (this.isEditMode== false){

      this.Newcustomer.firstName=FirstName;
      this.Newcustomer.lastName=LastName;
      this.Newcustomer.email=Email;
      this.Newcustomer.code=Code;
      this.Newcustomer.phone=Phone;
      this.Newcustomer.billingAddress=billingAddress;
      this.Newcustomer.addressLine2=AddressLine2;
      this.Newcustomer.activeted=Activated
      console.log(this.Newcustomer)
    this.service.AddCustomer(this.Newcustomer).subscribe({
      next:suceess=>{ this.message='تمت اضافة الصنف بنجاح' ; this.CustomerForm.reset() },
      error:err=>{    this .message = err  }
    });}
    else
    {
      this.editedModel.id= parseInt(this.id as string );
      this.editedModel.firstName=FirstName;
      this.editedModel.lastName=LastName;
      this.editedModel.email=Email;
      this.editedModel.code=Code;
      this.editedModel.phone=Phone;
      this.editedModel.billingAddress=billingAddress;
      this.editedModel.addressLine2=AddressLine2;
      this.editedModel.activeted=Activated
      this.service.EditCustomer(this.editedModel).subscribe({
        next:suceess=>{ this.message='تمت تعديل الصنف بنجاح' ; this.gotoList() },
        error:err=>{    this .message = err  }
      });}


  }

  gotoList()
  {
    sessionStorage.setItem('cutomer','cutomer')
    this.router.navigate(['controlpanel'])
  }

}



