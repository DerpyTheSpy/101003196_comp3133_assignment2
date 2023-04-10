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
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
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
    HttpClientModule,
    ApolloModule,
    ReactiveFormsModule,
    HttpLinkModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          link: httpLink.create({
            uri: 'https://101003196-comp-3133-assignment1.vercel.app/',
          }),
          cache: new InMemoryCache(),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private apollo: Apollo) {}
 }