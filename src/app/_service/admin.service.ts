import { Injectable } from '@angular/core';
import { Users, menu, roles, updaterole, updatestatus, userrole } from '../_model/Users';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../_store/model/user.Model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  BaseUrl = 'https://localhost:7143/api/';

  constructor(private http: HttpClient) { }

  Getallusers() {
    return this.http.get<Users[]>(this.BaseUrl + 'User/GetAll');
  }

  Getuser(code: string) {
    return this.http.get<Users>(this.BaseUrl + 'User/Getbycode?code=' + code);
  }

  Updateuserstatus(_data:updatestatus) {
    return this.http.post(this.BaseUrl + 'User/updatestatus',_data);
  }

  Updateuserrole(_data:updaterole) {
    return this.http.post(this.BaseUrl + 'User/updaterole',_data);
  }

  Saverolepermission(input: userrole[]) {
    return this.http.post(this.BaseUrl + 'UserRole/assignrolepermission', input);
  }

  Getallroles() {
    return this.http.get<roles[]>(this.BaseUrl + 'UserRole/GetAllRoles');
  }

  Getallmenus() {
    return this.http.get<menu[]>(this.BaseUrl + 'UserRole/GetAllmenus');
  }
  // Updatecustomer(input: Customer) {
  //   return this.http.put(this.BaseUrl + 'Customer/Update?code=' + input.code, input);
  // }
}
