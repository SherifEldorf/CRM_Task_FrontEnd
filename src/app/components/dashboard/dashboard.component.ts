import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  isgoodsList: boolean = false;
  iscustomersList: boolean = false;
  isSalesList: boolean = false;

  ngOnInit(): void {
    if (sessionStorage.getItem('goods')) {
      this.GetgoodsList();
    }
    if (sessionStorage.getItem('cutomer')) {
      this.GetCustomersList();
    }
    if (sessionStorage.getItem('order')) {
      this.GetsalesList();
    }
  }

  AddUser() {
    this.DisableLists();
    return (this.iscustomersList = true);
  }

  GetgoodsList() {
    this.DisableLists();
    sessionStorage.setItem('goods', 'goods');
    this.removeAllSessions('goods');
    return (this.isgoodsList = true);
  }

  GetsalesList() {
    this.DisableLists();
    sessionStorage.setItem('order', 'order');
    this.removeAllSessions('order');
    return (this.isSalesList = true);
  }

  GetCustomersList() {
    this.DisableLists();
    sessionStorage.setItem('movieactor', 'movieactor');
    this.removeAllSessions('movieactor');
    return (this.iscustomersList = true);
  }

  DisableLists() {
    this.isSalesList = false;
    this.iscustomersList = false;
    this.isgoodsList = false;
  }

  removeAllSessions(sessionName: string) {
    Object.keys(sessionStorage).forEach((key) => {
      if (key !== sessionName) {
        sessionStorage.removeItem(key);
      }
    });
  }
}
