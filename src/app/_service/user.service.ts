import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { APIResponse, Usercred, Usermenu, Userregister, registerconfirm, resetpassword, rolepermission, updatepassword } from '../_model/Users';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  BaseUrl = environment.apiUrl
  registerresponse = signal<registerconfirm>({
    userid: 0,
    username: '',
    otptext: ''
  })
  menulist = signal<Usermenu[]>([])

  constructor(private http: HttpClient) { }

  Userregisteration(userinfo: Userregister) {
    return this.http.post<APIResponse>(this.BaseUrl + 'User/userregisteration', userinfo);
  }

  confirmregisteration(_data: registerconfirm) {
    return this.http.post<APIResponse>(this.BaseUrl + 'User/confirmregisteration', _data)
  }

  UserLogin(_data: Usercred) {
    return this.http.post(this.BaseUrl + 'Authorize/GenerateToken', _data)
  }

  GetMenubyRole(userrole: string) {
    return this.http.get<Usermenu[]>(this.BaseUrl + 'UserRole/GetAllMenusbyrole?userrole=' + userrole)
  }

  Resetpassword(_data: resetpassword) {
    return this.http.post(this.BaseUrl + 'User/resetpassword', _data)
  }

  Forgetpassword(username: string) {
    return this.http.get(this.BaseUrl + 'User/forgetpassword?username=' + username)
  }

  Updatepassword(_data: updatepassword) {
    return this.http.post(this.BaseUrl + 'User/updatepassword', _data)
  }

  GetMenupermissionbyRole(userrole: string, menucode: string) {
    return this.http.get<rolepermission>(this.BaseUrl + 'UserRole/GetMenupermissionbyrole?userrole=' + userrole + '&menucode=' + menucode)
  }


}
