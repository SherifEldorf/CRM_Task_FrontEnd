import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Good } from '../models/good';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  datasource:any;
  constructor(
    private http: HttpClient
  ) { }
  baseUrl = 'http://localhost:58314/api/User/';

    GetAllProducts(): Observable<Good[]> {
      return this.http.get<Good[]>(this.baseUrl + 'GetAllProducts').pipe();
    }

    AddProduct( good : Good  ) :Observable<Good>
    {
    return this.http.post<Good>(this.baseUrl+'AddProduct',good).pipe();
    }

    GetProduct( id :string ) :Observable< Good >
    {
    return this.http.get<Good>(this.baseUrl+'GetProduct/'+ id ).pipe();
    }

    EditProduct( model :Good ) :Observable<Good>
    {
    return this.http.put<Good>(this.baseUrl+'EditProduct',model).pipe();
    }

    DeleteAllGoods( ids: any[] ) :Observable<Good[]>
    {
      return this.http.post<Good[]>(this.baseUrl+'DeleteProducts',ids ).pipe();

    }



}
