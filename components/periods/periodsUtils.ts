function totalSum(total: number, price: IPrice) {
    return total + price.total
}

export function toPrice(
    startsAt: string,
    index: number,
    arr: IPrice[],
    periodLength?: number
): IPrice | null {
    if (periodLength) {
        const days = arr.slice(index, index + periodLength)
        if (days.length === periodLength) {
            const total = days.reduce(totalSum, 0)

            return { startsAt, total }
        }
    }

    return null
}

export function toPeriod(
    startsAt: string,
    total: number,
    lowestTotal: number,
    periodLength: number
): IPeriod {
    return {
        startsAt,
        average: total / periodLength,
        percentageComparedToLowest: Math.round(
            (total / lowestTotal) * 100 - 100
        ),
    }
}

function byTotal(a: IPrice, b: IPrice) {
    return a.total - b.total
}

function outNull(item: IPrice | null): item is IPrice {
    return Boolean(item)
}

export function mapPriceInfoToPrices(priceInfo: IPriceInfo): IPrice[] {
    const { currentStartsAt, today, tomorrow } = priceInfo
    const allHours = today.concat(tomorrow)
    const nowIndex = allHours.findIndex(
        ({ startsAt }) => startsAt === currentStartsAt
    )

    return allHours.slice(nowIndex)
}

export function getPeriodPrices(
    prices: IPrice[],
    periodLength?: number
): IPrice[] {
    return prices
        .map(({ startsAt }, index, arr) =>
            toPrice(startsAt, index, arr, periodLength)
        )
        .filter(outNull)
}

export function mapHoursToPeriods(
    prices: IPrice[],
    periodLength: number
): IPeriod[] {
    const periodPricesSorted = getPeriodPrices(prices, periodLength).sort(
        byTotal
    )
    const lowestTotal = periodPricesSorted[0]?.total

    return periodPricesSorted.map(({ startsAt, total }) =>
        toPeriod(startsAt, total, lowestTotal, periodLength)
    )
}
export function getPeriodInfo(
    priceInfo: IPriceInfo,
    { numberOfPeriods, periodLength }: IConfig
): IPeroidInfo {
    const hourlyPrices = mapPriceInfoToPrices(priceInfo)
    const periodsSorted = mapHoursToPeriods(hourlyPrices, periodLength)

    return {
        periods: periodsSorted.slice(0, numberOfPeriods),
        lowestToday: '',
        lowestTomorrow: '',
    }
}
