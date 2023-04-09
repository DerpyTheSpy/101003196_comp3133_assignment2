import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';

import { HttpLink } from 'apollo-angular/http';
import { NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { setContext } from '@apollo/client/link/context';

const uri = environment.graphqlURL; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  const auth = setContext((operation, context) => {
    const token = localStorage.getItem('token');
 
    if (token === null) {
      return {};
    } else {
      return {
        headers: {
          Authorization: `JWT ${token}`,
        },
      };
    }
  });
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}