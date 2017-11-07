import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3010/graphql'
})

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

let loading = 0

export const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    // See 'apollo' definition
    // For example: default loading key
    $loadingKey: 'loading'
  },
  // Watch loading state for all queries
  // See the 'watchLoading' advanced option
  watchLoading (state, mod) {
    loading += mod
    console.log('Global loading', loading, mod)
  },
  // Global error handler for all smart queries and subscriptions
  errorHandler (error) {
    console.log('Global error handler')
    console.error(error)
  }
})
