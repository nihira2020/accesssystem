import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { updatepassword } from '../../_model/Users';

@Component({
  selector: 'app-passwordupdate',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './passwordupdate.component.html',
  styleUrl: './passwordupdate.component.css'
})
export class PasswordupdateComponent implements OnInit {
  constructor(private builder: FormBuilder, private service: UserService, private toast: ToastrService,
    private route:Router) {

  }
  ngOnInit(): void {
  }
  _response: any;

  form = this.builder.group({
    username: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    otptext: this.builder.control('', Validators.required)
  })

  Changepassword() {
    if (this.form.valid) {
      const _obj: updatepassword = {
        username: this.form.value.username as string,
        password: this.form.value.password as string,
        otptext:this.form.value.otptext as string
      }
      this.service.Updatepassword(_obj).subscribe(resp => {
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
