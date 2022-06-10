import { ApolloQueryResult } from '@apollo/client';
import { DocumentNode } from 'graphql';
import client from './apollo-client';
import { ViewerHomesDocument, ViewerHomesQuery } from './generated';

async function fetch<T>(query: DocumentNode): Promise<ApolloQueryResult<T>>{
    return await client.query({ query })
}

function outPriceWithoutData(item: any): item is IPrice {
    return item.total && item.startsAt
}

function outUndefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null;
  }

function mapViewerHomesQueryToPriceInfo(data: ViewerHomesQuery): IPriceInfo | undefined {
    const priceInfo = data?.viewer.homes[0]?.currentSubscription?.priceInfo;

    const now = priceInfo?.current?.startsAt;
    const today = priceInfo?.today?.filter(outUndefined).filter(outPriceWithoutData);
    const tomorrow = priceInfo?.tomorrow?.filter(outUndefined).filter(outPriceWithoutData);

    if(now && today && tomorrow){
        return {
            now, today, tomorrow
        }
    }

    return undefined;

}

export async function getPriceInfo(): Promise<IPriceInfo | undefined> {
    const { data }  = await fetch<ViewerHomesQuery>(ViewerHomesDocument)

    return mapViewerHomesQueryToPriceInfo(data)
}