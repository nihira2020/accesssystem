import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import {  Router, RouterLink } from '@angular/router';
import { resetpassword } from '../../_model/Users';

@Component({
  selector: 'app-resetpwd',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,RouterLink],
  templateUrl: './resetpwd.component.html',
  styleUrl: './resetpwd.component.css'
})
export class ResetpwdComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: UserService, private toast: ToastrService,
    private route:Router) {

  }
  ngOnInit(): void {
  }
  _response: any;

  form = this.builder.group({
    username: this.builder.control('', Validators.required),
    oldpassword: this.builder.control('', Validators.required),
    newpassword: this.builder.control('', Validators.required)
  })

  Changepassword() {
    if (this.form.valid) {
      const _obj: resetpassword = {
        username: this.form.value.username as string,
        oldpassword: this.form.value.oldpassword as string,
        newpassword:this.form.value.newpassword as string
      }
      this.service.Resetpassword(_obj).subscribe(resp => {
        this._response = resp;
        console.log(this._response);
        if(this._response.result=='pass'){
          this.toast.success('Please logn using new credentials','Password changed')
          this.route.navigateByUrl('/Login')
        }else{
          this.toast.error(this._response.message,'Failed')
        }
        
      }, error => {
        // You can access status:
        this.toast.error('Failed to Login',error.error.title)
      });
    }
  }

}
