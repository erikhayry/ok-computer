import { ApolloQueryResult } from '@apollo/client'
import { DocumentNode } from 'graphql'
import client from './apollo-client'
import { ViewerHomesDocument, ViewerHomesQuery } from './generated'
import { mapViewerHomesQueryToPriceInfo } from './utils'

async function fetch<T>(query: DocumentNode): Promise<ApolloQueryResult<T>> {
    return await client.query({ query })
}

export async function getPriceInfo(): Promise<IPriceInfo | undefined> {
    const { data } = await fetch<ViewerHomesQuery>(ViewerHomesDocument)

    return mapViewerHomesQueryToPriceInfo(data)
}
