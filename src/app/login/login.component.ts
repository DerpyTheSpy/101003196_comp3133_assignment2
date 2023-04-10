import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const GET_USER_QUERY = gql`
  query GetUser($username: String!, $password: String!){
    LoginComponent(username: $username, password: $password){
      email
      id
      password
      username
    }
  }
`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username: string = '';
  password: string = '';
  loginForm!: FormGroup;
  constructor(private authService: AuthServiceService, private router: Router, private form: FormBuilder, private apollo: Apollo) {
    this.loginForm = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  goToSignUp() {
    this.router.navigate(['signup']);
  }

  
  
  login() {
    this.apollo.query({
      query: GET_USER_QUERY,
      variables: {
        username: this.username,
        password: this.password
      }
    }).subscribe((response: any) => {
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