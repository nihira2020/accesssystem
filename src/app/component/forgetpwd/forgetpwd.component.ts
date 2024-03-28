import { Component } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormsModule } from '@angular/forms';
import { APIResponse } from '../../_model/Users';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgetpwd',
  standalone: true,
  imports: [MaterialModule,FormsModule,RouterLink],
  templateUrl: './forgetpwd.component.html',
  styleUrl: './forgetpwd.component.css'
})
export class ForgetpwdComponent {

  constructor(private service: UserService,private toastr:ToastrService,private route:Router) {

  }
  _response:any;
  username = '';


  ngOnInit(): void {

  }

  submitotp() {
    this.service.Forgetpassword(this.username).subscribe(item => {
      this._response = item;
      if(this._response.result=='pass'){
        this.route.navigateByUrl('/updatepassword');
      }else{
        this.toastr.error('Request failed -' + this._response.message, 'Failed')
      }
    });
  }


}
