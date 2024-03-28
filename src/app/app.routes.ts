import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmpwdComponent } from './component/confirmpwd/confirmpwd.component';
import { PasswordupdateComponent } from './component/passwordupdate/passwordupdate.component';
import { ForgetpwdComponent } from './component/forgetpwd/forgetpwd.component';
import { ResetpwdComponent } from './component/resetpwd/resetpwd.component';
import { CustomerComponent } from './component/customer/customer.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';
import { UserComponent } from './component/user/user.component';
import { UserroleComponent } from './component/userrole/userrole.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'confirmpassword', component: ConfirmpwdComponent },
    { path: 'forgetpassword', component: ForgetpwdComponent },
    { path: 'resetpassword', component: ResetpwdComponent },
    { path: 'updatepassword', component: PasswordupdateComponent },
    { path: 'customer', component: CustomerComponent },
    {path:'customer/add',component:AddcustomerComponent},
    {path:'customer/edit/:id',component:AddcustomerComponent},
    {path:'user',component:UserComponent},
    {path:'userrole',component:UserroleComponent}
];
