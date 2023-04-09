import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GraphQLModule } from './graphql/graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    EmployeeUpdateComponent,
    AddEmployeeComponent,
    ViewEmployeeComponent,
    LoginComponent,
    EmployeeListComponent,
    EmployeeDeleteComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(graphqlModule: GraphQLModule) {}
 }