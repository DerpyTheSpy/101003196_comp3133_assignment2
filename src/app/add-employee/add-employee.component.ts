import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeServicesService } from '../employee-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
selector: 'app-employee-form',
templateUrl: './add-employee.component.html',
styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employeeForm: FormGroup;
  fn: string = '';
  ln: string = '';
  em: string = '';
  g: string = '';
  s: number = 0;


 

  constructor(private employeeService: EmployeeServicesService, private router: Router, private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      salary: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]

    });
    
  }

  onSubmit() {

    this.fn = this.employeeForm.controls['first_name'].value;
    this.ln = this.employeeForm.controls['last_name'].value;
    this.em = this.employeeForm.controls['email'].value;
    this.g = this.employeeForm.controls['gender'].value;
    this.s = this.employeeForm.controls['salary'].value;

    console.log(this.fn);
    console.log(this.ln);
    console.log(this.em);
    console.log(this.g);
    console.log(this.s);
    
    this.employeeService.createEmployee(this.fn,this.ln,this.g,this.em,this.s).subscribe((res: any) => {
      console.log(res.data.addEmployee);

   
        this.router.navigate(['dashboard']);
   
      
    });

  }
  
}