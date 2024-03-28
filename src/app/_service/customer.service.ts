import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from '../_model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  BaseUrl = 'https://localhost:7143/api/';

  constructor(private http: HttpClient) { }

  Getallcustomer() {
    return this.http.get<Customer[]>(this.BaseUrl + 'Customer/GetAll');
  }

  Getcustomer(code: string) {
    return this.http.get<Customer>(this.BaseUrl + 'Customer/Getbycode?code=' + code);
  }

  Removecustomer(code: string) {
    return this.http.delete(this.BaseUrl + 'Customer/Remove?code=' + code);
  }

  Addcustomer(input: Customer) {
    return this.http.post(this.BaseUrl + 'Customer/Create', input);
  }
  Updatecustomer(input: Customer) {
    return this.http.put(this.BaseUrl + 'Customer/Update?code=' + input.code, input);
  }
}
