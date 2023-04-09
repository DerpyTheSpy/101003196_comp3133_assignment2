import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private apollo: Apollo) { }

  registerUser(username : string,email: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation RegisterUser($email: String!, $password: String!, $username: String!) {
          signup(email: $email, password: $password, username: $username) {
           status
            message
          }
        }
      `,
      variables: {
        email,
        password,
        username
      }
    });
  }
  loginUser(username: string, password: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation LoginUser($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            status
            message
            token
          }
        }
      `,
      variables: {
        username,
        password
      }
    });
  }
}