import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Employee } from './Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServicesService {

  constructor(private apollo: Apollo) { }

  getAllEmployees() {
    return this.apollo.watchQuery({
      query: gql`
        query {
          getEmployees {
            id
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
    }).valueChanges;
  }

  getEmployeeById(id: string) {
    return this.apollo.watchQuery({
      query: gql`
        query GetEmployeeById($id: ID!) {
          getEmployeeByID(id: $id) {
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        id
      }
    }).valueChanges;
  }

  createEmployee(firstName : string,lastName: string,gender : string,email : string,salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addEmployee($fn: String!, $ln: String!, $g: String!, $e: String!, $s: Float!) {
          addEmployee(firstName: $fn, lastName: $ln, gender: $g, email: $e, salary: $s) {
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        fn: firstName,
        ln: lastName,
        g: gender,
        e: email,
        s: salary
      },
      refetchQueries: [{
        query: gql`
          query {
            getEmployees {
              id
              firstName
              lastName
              email
              gender
              salary
            }
          }
        `
      }]
    });
  }

  updateEmployee(employee: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation UpdateEmployee($update: EmployeeUpdateInput!) {
          updateEmployee(update: $update) {
            firstName
            lastName
            email
            gender
            salary
          }
        }
      `,
      variables: {
        update: employee
      },
      refetchQueries: [{
        query: gql`
          query {
            getEmployees {
              id
              firstName
              lastName
              email
              gender
              salary
            }
          }
        `
      }]
    });
  }

  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            status
            message
          }
        }
      `,
      variables: {
        id
      },
      refetchQueries: [{
        query: gql`
          query {
            getEmployees {
              id
              firstName
              lastName
              email
              gender
              salary
            }
          }
        `
      }]
    });
  }
}

