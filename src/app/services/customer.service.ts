import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  datasource:any;
  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://localhost:58314/api/User/';

  GetAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl + 'GetAllCustomers').pipe();
  }
  AddCustomer( customer : Customer  ) :Observable<Customer>
  {
  return this.http.post<Customer>(this.baseUrl+'AddCustomer',customer).pipe();
  }

  GetCustomer( id :string ) :Observable< Customer >
  {
  return this.http.get<Customer>(this.baseUrl+'GetCustomer/'+ id ).pipe();
  }

  EditCustomer( model :Customer ) :Observable<Customer>
  {
  return this.http.put<Customer>(this.baseUrl+'EditCustomer',model).pipe();
  }

  DeleteAllCustomers( ids: any[] ) :Observable<Customer[]>
  {
    return this.http.post<Customer[]>(this.baseUrl+'DeleteAllCustomers',ids ).pipe();

  }
}
