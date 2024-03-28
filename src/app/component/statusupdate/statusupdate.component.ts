import { Component, Inject } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserModel } from '../../_store/model/user.Model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AdminService } from '../../_service/admin.service';
import { Users, roles, updaterole, updatestatus } from '../../_model/Users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-statusupdate',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './statusupdate.component.html',
  styleUrl: './statusupdate.component.css'
})
export class StatusupdateComponent {
  type = ''
  isedit = false;
  dialogdata: any;
  editcode!: string;
  editdata!: Users;
  _response: any;
  rolelist!: roles[];


  constructor(private builder: FormBuilder, private ref: MatDialogRef<StatusupdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: AdminService,private toastr:ToastrService) {

  }
  ngOnInit(): void {
    this.LoadRoles();
    this.dialogdata = this.data;
    this.type = this.dialogdata.type;
    this.editcode = this.dialogdata.username;
    if (this.editcode != null && this.editcode != '') {
      this.service.Getuser(this.editcode).subscribe(item => {
        this.editdata = item;
        this.userform.setValue({ username: this.editdata.username, status: this.editdata.isactive, role: this.editdata.role });
      });


    }
  }

  ClosePopup() {
    this.ref.close();
  }

  LoadRoles(){
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    })
  }



  userform = this.builder.group({
    username: this.builder.control({ value: '', disabled: true }),
    role: this.builder.control(''),
    status: this.builder.control(true)
  })

  Save() {
    if (this.userform.valid) {
      if (this.type == 'status') {
        const obj: updatestatus = {
          username: this.editcode,
          status: this.userform.value.status as boolean
        }
        this.service.Updateuserstatus(obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('User status changed.','Success')
            this.ClosePopup();
          } else {
            this.toastr.error('User status update failed -' + this._response.message, 'Failed')
          }
        });
      } else {
        const obj: updaterole = {
          username: this.editcode,
          role: this.userform.value.role as string
        }
        this.service.Updateuserrole(obj).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('User Role changed.','Success')
            this.ClosePopup();
          } else {
            this.toastr.error('User Role update failed -' + this._response.message, 'Failed')
          }
        });
      }
      
    }
  }

}
