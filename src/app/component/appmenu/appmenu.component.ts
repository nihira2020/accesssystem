import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Usermenu } from '../../_model/Users';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit, DoCheck {

  ismenuvisible = false;
  menulist !: Usermenu[];
  Loginuser='';

  constructor(private service: UserService, private router: Router,private toast:ToastrService) {
    effect(() => {
      this.menulist = this.service.menulist();
    })

  }
  ngOnInit(): void {
    let userrole = localStorage.getItem('userrole');
    
    if (userrole != null && userrole != '') {
      this.service.GetMenubyRole(userrole).subscribe(item => {
        this.menulist = item
      })

    } else {
      this.router.navigateByUrl('/Login');
    }

  }

  ngDoCheck(): void {
    this.Accesscheck();
  }

  Accesscheck() {
    let userrole = localStorage.getItem('userrole');
    this.Loginuser=localStorage.getItem('username') as string;
    const currentroute = this.router.url;
    if (currentroute === '/Login' || currentroute === '/register' || currentroute === '/forgetpassword') {
      this.ismenuvisible = false
    } else {
      this.ismenuvisible = true;
    }

    // admin access

    if((currentroute === '/user' || currentroute === '/userrole') && userrole!=='admin' ){
       this.router.navigateByUrl('/');
       this.toast.warning('Unauthorized access','Warning')
    }
  }

}
