import { Component, ViewChild } from '@angular/core';
import { Customer } from '../../_model/Customer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CustomerService } from '../../_service/customer.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { rolepermission } from '../../_model/Users';
import { UserService } from '../../_service/user.service';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  _list!: Customer[];
  datasource: any;
  _response: any;
  _permission!: rolepermission;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["code", "name", "email", "phone", "creditlimit", "status", "action"]
  constructor(private service: CustomerService, private router: Router, private toastr: ToastrService, private _userservice: UserService) {

  }
  ngOnInit(): void {
    this.Loadallcustomer();
    this.pageaccess();
  }

  pageaccess() {
    let _userrole = localStorage.getItem('userrole') as string;
    this._userservice.GetMenupermissionbyRole(_userrole, 'customer').subscribe(item => {
      this._permission = item;
      if (!this._permission.haveview) {
        this.toastr.warning('Unauthorized access');
        this.router.navigateByUrl('/');
      }
    })
  }

  Loadallcustomer() {
    this.service.Getallcustomer().subscribe(item => {
      this._list = item;
      this.datasource = new MatTableDataSource<Customer>(this._list);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  FunctionAdd() {
    this.router.navigateByUrl('/customer/add');
  }
  FunctionEdit(code: string) {
    if(this._permission.haveedit){
      this.router.navigateByUrl('/customer/edit/' + code);
    }else{
      this.toastr.warning('User not have access','Unautohrized')
    }
    
  }

  FunctionDelete(code: string) {
    if(this._permission.havedelete){
      if (confirm('do you want to remove?')) {
        this.service.Removecustomer(code).subscribe(item => {
          this._response = item;
          if (this._response.result == 'pass') {
            this.toastr.success('Removed successfully.', 'Removed');
            this.Loadallcustomer();
          } else {
            this.toastr.error('Remove failed -' + this._response.message, 'Failed')
          }
        });
      }
    }else{
      this.toastr.warning('User not have access','Unautohrized')
    }
   
  }


}
