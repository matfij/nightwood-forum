import { setContext } from '@apollo/client/link/context';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { PersistenceService } from '../state/persistence.service';

const setAuthorizationLink = setContext((request, previousContext) => {
    const accessToken = PersistenceService.getAuthState()?.accessToken;
    return {
        headers: {
            ...previousContext.headers,
            authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
    };
});

const httpLink = new HttpLink({ uri: 'http://localhost:14000/graphql' });

export const gqlClient = new ApolloClient({
    link: ApolloLink.from([setAuthorizationLink, httpLink]),
    cache: new InMemoryCache(),
});
