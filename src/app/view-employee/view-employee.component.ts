import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { Apollo, gql } from 'apollo-angular';
import { EmployeeServicesService } from '../employee-service.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
  id!: any;
  employee!: Employee;

  constructor( private route: ActivatedRoute, private router: Router, private apollo: Apollo, private emp: EmployeeServicesService) { }

  ngOnInit() : void {

    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];

    this.emp.getEmployeeById(this.id).subscribe((result: any) => {
      this.employee = result.data.getEmployeeByID as Employee;
    }
    )

  }
  getAllEmployees() {
    this.router.navigate(['dashboard']);
  }

  
}