import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql } from 'apollo-angular';
import { EmployeeServicesService } from '../employee-service.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeData: any[] = [];

  constructor(private router: Router, private apollo: Apollo, private empService: EmployeeServicesService) { }

  ngOnInit(): void {
    this.apollo
      .query({
        query: gql`
          query {
            getEmployees {
              id
              firstName
              lastName
              email
              salary
              gender
            }
          }
        `,
      })
      .subscribe((result: any) => {
        console.log(result.data.getEmployees);
        this.employeeData = result.data.getEmployees;
      });
  }

  addEmployee() {
    this.router.navigate(['add']);
  }

  employeeDetails(id: any) {
    this.router.navigate(['dashboard', id]);
  }

  deleteEmployee(id: any) {
    this.empService.deleteEmployee(id).subscribe((result: any) => {
      console.log(result.data.deleteEmployee);
      this.router.navigate(['dashboard']);
    });
  }

  updateEmployee(id: any) {
    this.router.navigate(['dashboard/edit', id]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
}
