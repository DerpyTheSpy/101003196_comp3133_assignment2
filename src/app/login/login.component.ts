import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router, private form: FormBuilder) {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  goToSignUp() {
    this.router.navigate(['signup']);
  }

  
  
  login() {
    this.authService.loginUser(this.username, this.password)
      .subscribe((response: any) => {
        if (response.data.login.status) {
          // Login successful, store JWT token in localStorage
          localStorage.setItem('token', response.data.login.token);
  
          // Redirect to dashboard
          this.router.navigate(['/dashboard']);
        } else {
          // Login failed, show error message to user
          alert(response.data.login.message);
        }
      });
  }  
}