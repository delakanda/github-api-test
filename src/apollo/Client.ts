import { ApolloClient, InMemoryCache, NormalizedCacheObject, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

export const getApolloClient = (): ApolloClient<NormalizedCacheObject> => {
    const httpLink = createHttpLink({
        uri: 'https://api.github.com/graphql'
    });
    
    const authLink = setContext((_, { headers }) => {
    const token = process.env.REACT_APP_GITHUB_BEARER;
    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : "",
        }
    }
    });

    const client = new ApolloClient({
        uri: 'https://api.github.com/graphql',
        link: authLink.concat(httpLink),
        cache: new InMemoryCache()
    });
    return client;
}