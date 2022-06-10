import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()

const httpLink = createHttpLink({
  uri: "https://api.tibber.com/v1-beta/gql",
});

const authLink = setContext((_, { headers }) => {  
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${publicRuntimeConfig.apiToken}`
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;
