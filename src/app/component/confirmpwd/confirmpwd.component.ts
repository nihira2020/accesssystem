import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { APIResponse, registerconfirm } from '../../_model/Users';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-confirmpwd',
  standalone: true,
  imports: [MaterialModule, FormsModule,RouterLink],
  templateUrl: './confirmpwd.component.html',
  styleUrl: './confirmpwd.component.css'
})
export class ConfirmpwdComponent implements OnInit {

  constructor(private service: UserService,private toastr:ToastrService,private route:Router) {

  }
  regresponse!: registerconfirm;
  _response!: APIResponse;
  otptext = '';


  ngOnInit(): void {

    this.regresponse = this.service.registerresponse();
  }

  submitotp() {
    this.regresponse.otptext = this.otptext;
    this.service.confirmregisteration(this.regresponse).subscribe(item => {
      this._response = item;
      if(this._response.result=='pass'){
        this.toastr.success('Registeration completed successfully.','Success');
        this.service.registerresponse.set({
          userid: 0,
          username: '',
          otptext: ''
        })
        this.route.navigateByUrl('/Login');
      }else{
        this.toastr.error('Registeration failed -' + this._response.message, 'OTP Verfication Failed')
      }
    });
  }


}
