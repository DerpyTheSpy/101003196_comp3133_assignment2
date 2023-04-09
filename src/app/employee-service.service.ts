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
            first_name
            last_name
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
            first_name
            last_name
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

  createEmployee(first_name : string,last_name: string,gender : string,email : string,salary: number) {
    return this.apollo.mutate({
      mutation: gql`
        mutation addEmployee($fn: String!, $ln: String!, $g: String!, $e: String!, $s: Float!) {
          addEmployee(first_name: $fn, last_name: $ln, gender: $g, email: $e, salary: $s) {
            first_name
            last_name
            email
            gender
            salary
          }
        }
      `,
      variables: {
        fn: first_name,
        ln: last_name,
        g: gender,
        e: email,
        s: salary
      },
      refetchQueries: [{
        query: gql`
          query {
            getEmployees {
              id
              first_name
              last_name
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
            first_name
            last_name
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
              first_name
              last_name
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
              first_name
              last_name
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

