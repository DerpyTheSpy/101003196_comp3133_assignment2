import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
const routes: Routes = [
  { path: 'dashboard', component: EmployeeListComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard/:id', component: ViewEmployeeComponent },
  { path: 'dashboard/edit/:id', component: EmployeeUpdateComponent },
  { path: 'add', component: AddEmployeeComponent },
  { path: 'dashboard/delete/:id', component: EmployeeDeleteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
