import { ApolloQueryResult } from '@apollo/client'
import { DocumentNode } from 'graphql'
import client from './apollo-client'
import { ViewerHomesDocument, ViewerHomesQuery } from './generated'

async function fetch<T>(query: DocumentNode): Promise<ApolloQueryResult<T>> {
    return await client.query({ query })
}

function isPrice(item: any): item is IPrice {
    return item.total && item.startsAt
}

function outPriceWithoutData(item: any): item is IPrice {
    return isPrice(item)
}

function outUndefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null
}

function mapToPricesWithData(
    hours: ({
        total?: number | null | undefined
        startsAt?: string | null | undefined
    } | null)[] = []
): IPrice[] {
    return hours.filter(outUndefined).filter(outPriceWithoutData)
}

function mapViewerHomesQueryToPriceInfo(
    data: ViewerHomesQuery
): IPriceInfo | undefined {
    const priceInfo = data?.viewer.homes[0]?.currentSubscription?.priceInfo
    const current = priceInfo?.current
    const today = mapToPricesWithData(priceInfo?.today)
    const tomorrow = mapToPricesWithData(priceInfo?.tomorrow)

    if (current?.startsAt && today && tomorrow) {
        return {
            currentStartsAt: current.startsAt,
            today,
            tomorrow,
        }
    }

    return undefined
}

export async function getPriceInfo(): Promise<IPriceInfo | undefined> {
    const { data } = await fetch<ViewerHomesQuery>(ViewerHomesDocument)

    return mapViewerHomesQueryToPriceInfo(data)
}
