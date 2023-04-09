import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServicesService } from '../employee-services.service';
import { Employee } from '../Employee';
import { FormGroup, Validators , FormBuilder} from '@angular/forms';
import { Apollo } from 'apollo-angular';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
id!: any;
employeeForm!: FormGroup;
employee!: Employee;
  
  updatedEmployee: Employee = {
    id: '',
    first_name: '',
    last_name: '',
    email: '',
    gender: '',
    salary: 0
  };

  constructor(
    private empService: EmployeeServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
     private apollo: Apollo
  ) { 
    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    });
  }

  ngOnInit(): void {
    this.employee = new Employee();
     this.id = this.route.snapshot.paramMap.get('id');
    this.empService.getEmployeeById(this.id).subscribe((result: any) => {
      this.employee = result.data.getEmployeeByID as Employee;
    });
  }

  updateEmployee(): void {
    this.updatedEmployee.id = this.id;
    this.updatedEmployee.first_name = this.employeeForm.controls['first_name'].value;
    this.updatedEmployee.last_name = this.employeeForm.controls['last_name'].value;
    this.updatedEmployee.email = this.employeeForm.controls['email'].value;
    this.updatedEmployee.gender = this.employeeForm.controls['gender'].value;
    this.updatedEmployee.salary = this.employeeForm.controls['salary'].value;

    console.log(this.updatedEmployee);
    this.empService.updateEmployee(this.updatedEmployee).subscribe(() => {
      this.router.navigate(['dashboard']);
    });
  }

}