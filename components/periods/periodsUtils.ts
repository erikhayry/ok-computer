export function toPeriod(
    { startsAt }: IPrice,
    index: number,
    arr: IPrice[]
): IPrice | null {
    const dayOnePrice = arr[index].total
    const dayTwoPrice = arr[index + 1]?.total
    const dayThreePrice = arr[index + 2]?.total
    const total = dayOnePrice + dayTwoPrice + dayThreePrice

    if (isNaN(total)) {
        return null
    }

    return { startsAt, total }
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

export function mapHoursToPeriods(prices: IPrice[]): IPrice[] {
    return prices.map(toPeriod).filter(outNull).sort(byTotal)
}

export function getPeriods(priceInfo: IPriceInfo, size: number): IPrice[] {
    const hourlyPrices = mapPriceInfoToPrices(priceInfo)
    const periodsSorted = mapHoursToPeriods(hourlyPrices)

    return periodsSorted.slice(0, size)
}

export function toDate(dateString: string) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    return date.toLocaleDateString('sv-SE', options)
}