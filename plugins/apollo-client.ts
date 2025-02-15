import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(() => {
    const apolloClient = new ApolloClient({
        uri: 'http://localhost:8444/graphql',
        cache: new InMemoryCache(),
    })

    return {
        provide: {
            apollo: apolloClient,
        },
    }
})
