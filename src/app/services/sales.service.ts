import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  datasource:any;
  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://localhost:58314/api/User/';

  GetAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.baseUrl + 'GetAllOrders').pipe();
  }
  AddOrder( fd: FormData  )
  {
  return this.http.post(this.baseUrl+'AddOrder',fd).pipe();
  }



  DeleteAllOrders( ids: any[] ) :Observable<Order[]>
  {
    return this.http.post<Order[]>(this.baseUrl+'DeleteAllOrders',ids ).pipe();

  }
}
