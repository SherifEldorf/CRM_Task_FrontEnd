import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isOpen:boolean=false;
  isUser:boolean=false;
   auth :any;
   searchvalue:string='';

   user:any;
  constructor( private router:Router )
   {
    }

  ngOnInit(): void {

  }
  toggle_navbar()
  {
    this.isOpen=!this.isOpen;
  }
  logOut()
  {

  }


}
