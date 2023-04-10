import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { ExecutionPatchResult } from '@apollo/client/core';
import { Router } from '@angular/router';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';

const CREATE_USER_MUTATION = gql`
  mutation Mutation($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      id
      username
      email
    }
  }
`;


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  signUpForm!: FormGroup;

  constructor(private authService: AuthServiceService, private router: Router, private form: FormBuilder, private apollo: Apollo ) {
    this.signUpForm = this.form.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.apollo.mutate({
      mutation: CREATE_USER_MUTATION,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }).subscribe((result) => {
      console.log(result);
    });

  }
  

  goToLogin() {
    this.router.navigate(['login']);
  }

  onSubmit() {
    this.username = this.signUpForm.controls['username'].value;
    this.email = this.signUpForm.controls['email'].value;
    this.password = this.signUpForm.controls['password'].value;
    this.authService.registerUser(this.username, this.email, this.password)
      .subscribe((res: any) => {
        if (res.data && res.data.signup.status) {
          alert('Successfully registered');
          this.router.navigate(['login']);
        } else if (res.errors) {
          this.errorMessage = res.errors[0].message;
        } else {
          this.errorMessage = 'An error occurred while registering.';
        }
      }, (error) => {
      alert(error);
        this.errorMessage = 'An error occurred while registering.';
      });
  }
}