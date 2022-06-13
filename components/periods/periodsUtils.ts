function totalSum(total: number, price: IPrice) {
    return total + price.total
}

export function toPeriod(
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

export function mapHoursToPeriods(
    prices: IPrice[],
    periodLength?: number
): IPrice[] {
    return prices
        .map(({ startsAt }, index, arr) =>
            toPeriod(startsAt, index, arr, periodLength)
        )
        .filter(outNull)
        .sort(byTotal)
}

export function getPeriods(
    priceInfo: IPriceInfo,
    { numberOfPeriods, periodLength }: IConfig
): IPrice[] {
    const hourlyPrices = mapPriceInfoToPrices(priceInfo)
    const periodsSorted = mapHoursToPeriods(hourlyPrices, periodLength)

    return periodsSorted.slice(0, numberOfPeriods)
}
