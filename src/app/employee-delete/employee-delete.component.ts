import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../Employee';
import { EmployeeServicesService } from '../employee-service.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  employee: Employee = new Employee();

  constructor(
    private employeeService: EmployeeServicesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeService.getEmployeeById(id).subscribe((employee: any) => {
        this.employee = employee as Employee;
      });
    }
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  deleteEmployee(): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe(
        () => {
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error(error);
          // show an error message to the user
        }
      );
    }
  }
}
