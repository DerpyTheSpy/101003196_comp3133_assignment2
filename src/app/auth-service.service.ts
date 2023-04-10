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
          mutation Mutation($username: String!, $email: String!, $password: String!) {
            createUser(username: $username, email: $email, password: $password) {
              id
              username
              email
              password
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
      query GetUser($username: String!, $password: String!){
        Login(username: $username, password: $password){
          email
          id
          password
          username
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