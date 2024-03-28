import { Component, ViewChild } from '@angular/core';
import { Users } from '../../_model/Users';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AdminService } from '../../_service/admin.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from '../../_model/Customer';
import { MaterialModule } from '../../material.module';
import { MatDialog } from '@angular/material/dialog';
import { StatusupdateComponent } from '../statusupdate/statusupdate.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  _list!: Users[];
  datasource: any;
  _response: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColums: string[] = ["code", "name", "email", "phone", "role", "status", "action"]
  constructor(private service: AdminService, private router: Router, private toastr: ToastrService,
    private dialog:MatDialog) {

  }
  ngOnInit(): void {
    this.Loadalluser();
  }

  Loadalluser() {
    this.service.Getallusers().subscribe(item => {
      this._list = item;
      this.datasource = new MatTableDataSource<Users>(this._list);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  ChangeStatus(username: string) {
    this.OpenPopup(username,'status')
  }

  ChangeRole(username: string) {
    this.OpenPopup(username,'role')
  }

  OpenPopup(username: string, type: string) {
    this.dialog.open(StatusupdateComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        username: username,
        type: type
      }
    }).afterClosed().subscribe(item=>{
      this.Loadalluser();
    })

  }


  // FunctionDelete(code: string) {
  //   if (confirm('do you want to remove?')) {
  //     this.service.Removecustomer(code).subscribe(item => {
  //       this._response=item;
  //       if(this._response.result=='pass'){
  //         this.toastr.success('Removed successfully.','Removed');
  //         this.Loadallcustomer();
  //       }else{
  //         this.toastr.error('Remove failed -' + this._response.message, 'Failed')
  //       }
  //     });
  //   }
  // }
}
