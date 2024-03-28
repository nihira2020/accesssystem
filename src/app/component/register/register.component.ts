import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Userregister, Users, registerconfirm } from '../../_model/Users';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder,
    private service: UserService,
    private route: Router,
    private toastr: ToastrService,
    private store: Store) {

  }

  _response: any;

  registerform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required)
  })

  Proceedregister() {
    if (this.registerform.valid) {
      if (this.registerform.value.password === this.registerform.value.confirmpassword) {
        const _userobj: Userregister = {
          UserName: this.registerform.value.username as string,
          Password: this.registerform.value.password as string,
          Name: this.registerform.value.name as string,
          Email: this.registerform.value.email as string,
          Phone: this.registerform.value.phone as string
        }
        this.service.Userregisteration(_userobj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            let _obj: registerconfirm = {
              userid: this._response.message,
              username: _userobj.UserName,
              otptext: ''
            }
            this.service.registerresponse.set(_obj);
            this.toastr.success('Validate OTP & complete registeration')
            this.route.navigateByUrl('/confirmpassword');
          } else {
            this.toastr.error('Registeration failed -' + this._response.message, 'Failed')
          }
        });
      } else {
        this.toastr.error('password mismatch', 'Failed')
      }
    }
  }
}
