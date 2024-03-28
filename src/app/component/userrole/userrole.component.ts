import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { menu, rolepermission, roles, userrole } from '../../_model/Users';
import { AdminService } from '../../_service/admin.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userrole',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './userrole.component.html',
  styleUrl: './userrole.component.css'
})
export class UserroleComponent implements OnInit {

  constructor(private builder: FormBuilder, private service: AdminService, private userservice: UserService,
    private toastr: ToastrService) {

  }

  rolelist!: roles[];
  menulist!: menu[];
  accessedetail !: FormArray<any>;
  useraccess!: rolepermission;
  selectedrole = '';
  finalarray: userrole[] = [];
  _response:any;

  ngOnInit(): void {
    this.loadmenus('');
    this.Loadallroles();
  }

  loadmenus(rolecode: string) {
    this.selectedrole = rolecode;
    this.accessedetail = this.roleform.get("access") as FormArray;
    this.accessedetail.clear();
    this.service.Getallmenus().subscribe(item => {
      this.menulist = item;
      if (this.menulist.length > 0) {
        this.menulist.map((o: menu) => {
          if (rolecode != '' && rolecode != null) {
            this.userservice.GetMenupermissionbyRole(rolecode, o.code).subscribe(item => {
              this.useraccess = item;
              this.addnewproduct(o, this.useraccess);
            });

          } else {
            this.addnewproduct(o, {
              code: '',
              name: '',
              haveview: false,
              haveadd: false,
              haveedit: false,
              havedelete: false
            });
          }

        });
      }
    })
  }

  Loadallroles() {
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    })
  }

  Save() {
    if (this.roleform.valid) {
      let formarry = this.roleform.value.access as rolepermission[];
      formarry.map((o: rolepermission) => {
        if (o.haveview) {
          let _obj: userrole = {
            userrole: this.selectedrole,
            menucode: o.code,
            haveview: o.haveview,
            haveadd: o.haveadd,
            haveedit: o.haveedit,
            havedelete: o.havedelete
          }
          this.finalarray.push(_obj);
        }
      })

      if (this.finalarray.length > 0) {

        this.service.Saverolepermission(this.finalarray).subscribe(item => {
           this._response=item;
           if (this._response.result == 'pass') {
            this.toastr.success('Role permission saved.','Success')
          } else {
            this.toastr.error('Role permission save failed -' + this._response.message, 'Failed')
          }
        });

      } else {
        this.toastr.warning('Please select atleast 1 menu', 'Select menu.')
      }
    }


  }

  roleform = this.builder.group({
    access: this.builder.array([]),
    userrole: this.builder.control('', Validators.required)
  });

  Generaterow(input: menu, access: rolepermission) {
    return this.builder.group({
      code: this.builder.control(input.code),
      haveview: this.builder.control(access.haveview),
      haveadd: this.builder.control(access.haveadd),
      haveedit: this.builder.control(access.haveedit),
      havedelete: this.builder.control(access.havedelete)
    });
  }

  addnewproduct(input: menu, access: rolepermission) {
    // this.accessedetail = this.roleform.get("access") as FormArray;

    this.accessedetail.push(this.Generaterow(input, access));
  }

  get getrows() {
    return this.roleform.get("access") as FormArray;
  }

  roleselection(event: any) {
    let selectedrole = event.value;
    this.loadmenus(selectedrole);
  }


}
