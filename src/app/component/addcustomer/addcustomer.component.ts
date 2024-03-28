import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Customer } from '../../_model/Customer';
import { CustomerService } from '../../_service/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent implements OnInit {
  title = 'Create Customer'
  isedit = false;
  editcode!: string;
  editdata!: Customer;
  _response: any;


  constructor(private builder: FormBuilder, private service: CustomerService, private router: Router, private toastr: ToastrService,
    private act:ActivatedRoute) {

  }
  ngOnInit(): void {
     this.editcode = this.act.snapshot.paramMap.get('id') as string;
    if (this.editcode != '' && this.editcode!=null) {
     this.customerform.controls['code'].disable();
     this.isedit=true;
       this.service.Getcustomer(this.editcode).subscribe(item=>{
         this.editdata=item;
         this.customerform.setValue({code:this.editdata.code,name:this.editdata.name,
        email:this.editdata.email,phone:this.editdata.phone,creditlimit:this.editdata.creditlimit,status:this.editdata.isActive});
       });
    }
  }

  ClosePopup() {
    this.router.navigateByUrl('/customer');
  }



  customerform = this.builder.group({
    code: this.builder.control(''),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    phone: this.builder.control('', Validators.required),
    creditlimit: this.builder.control(0),
    status: this.builder.control(true)
  })

  Save() {
    if (this.customerform.valid) {
      const _obj: Customer = {
        code: this.customerform.value.code as string,
        name: this.customerform.value.name as string,
        email: this.customerform.value.email as string,
        phone: this.customerform.value.phone as string,
        creditlimit: this.customerform.value.creditlimit as number,
        isActive: this.customerform.value.status as boolean,
        statusname: ''
      }
      if (!this.isedit) {
        this.service.Addcustomer(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('Created successfully.', 'Created');
            this.router.navigateByUrl('/customer');
          } else {
            this.toastr.error('Created failed -' + this._response.message, 'Failed')
          }
        });
      } else {
        _obj.code=this.editcode;
        this.service.Updatecustomer(_obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('Updated successfully.', 'Updated');
            this.router.navigateByUrl('/customer');
          } else {
            this.toastr.error('Updated failed -' + this._response.message, 'Failed')
          }
        });
      }
    }
  }

}
