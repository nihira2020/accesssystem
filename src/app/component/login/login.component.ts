import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Usercred, Usermenu } from '../../_model/Users';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  menulist !: Usermenu[];
  constructor(private builder: FormBuilder, private service: UserService, private toast: ToastrService,
    private route:Router) {

  }
  ngOnInit(): void {
    localStorage.clear();
  }
  _response: any;

  loginform = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required)
  })

  Proceedlogin() {
    if (this.loginform.valid) {
      const _obj: Usercred = {
        username: this.loginform.value.username as string,
        password: this.loginform.value.password as string
      }
      this.service.UserLogin(_obj).subscribe(resp => {
        this._response = resp;
        localStorage.setItem('token',this._response.token);
        localStorage.setItem('userrole',this._response.userRole);
        localStorage.setItem('username',_obj.username)
        this.service.GetMenubyRole(this._response.userRole).subscribe(item => {
          this.menulist=item
          this.service.menulist.set(this.menulist);
         })
        this.route.navigateByUrl('/')
      }, error => {
        // You can access status:
        this.toast.error('Failed to Login',error.error.title)
      });
    }
  }

  resetlogin() {
    this.loginform.reset();
    this.service.menulist.set([]);
  }

}
