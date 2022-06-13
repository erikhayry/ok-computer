import { ViewerHomesQuery } from './generated'

export function outPriceWithoutData(item: any): item is IPrice {
    return typeof item?.total === 'number' && typeof item?.startsAt === 'string'
}

export function outUndefined<T>(value: T | undefined | null): value is T {
    return <T>value !== undefined && <T>value !== null
}

interface IApiHour {
    total?: number | null | undefined
    startsAt?: string | null | undefined
}

export function mapToPricesWithData(hours: (IApiHour | null)[] = []): IPrice[] {
    return hours.filter(outUndefined).filter(outPriceWithoutData)
}

export function mapViewerHomesQueryToPriceInfo(
    data: ViewerHomesQuery
): IPriceInfo | undefined {
    const priceInfo = data.viewer.homes[0]?.currentSubscription?.priceInfo
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
