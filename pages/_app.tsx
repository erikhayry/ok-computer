import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'
import client from '../fetch/client'
import '../styles/globals.css'

function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default App
