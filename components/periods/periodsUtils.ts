import {
    DAY,
    IConfig,
    IPeriod,
    IPeroidInfo,
    IPrice,
    IPriceInfo,
} from '../../types'

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

function getPercentage(value: number, comparedTo: number): number {
    return Math.abs(Math.round((value / comparedTo) * 100) - 100)
}

export function getDay(date: string): DAY {
    if (new Date(date).getDay() === new Date().getDay()) {
        return DAY.TODAY
    }

    return DAY.TOMORROW
}

function outToday({ day }: IPeriod) {
    return day === DAY.TODAY
}

function outTomorrow({ day }: IPeriod) {
    return day === DAY.TOMORROW
}

function byPeriodTotal(a: IPeriod, b: IPeriod) {
    return a.average - b.average
}

export function getLowest(periods: IPeriod[]): {
    today: IPeriod
    tomorrow?: IPeriod
} {
    const today = periods.filter(outToday).sort(byPeriodTotal)[0]
    const tomorrow = periods.filter(outTomorrow).sort(byPeriodTotal)[0]

    return { today, tomorrow }
}

export function toPeriod(
    startsAt: string,
    total: number,
    lowestTotal: number,
    highestTotal: number,
    periodLength: number
): IPeriod {
    return {
        startsAt,
        average: total / periodLength,
        day: getDay(startsAt),
        percentageComparedToLowest: getPercentage(total, lowestTotal),
        percentageComparedToHighest: getPercentage(total, highestTotal),
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
    const highestTotal =
        periodPricesSorted[periodPricesSorted.length - 1]?.total

    return periodPricesSorted.map(({ startsAt, total }) =>
        toPeriod(startsAt, total, lowestTotal, highestTotal, periodLength)
    )
}
export function getPeriodInfo(
    priceInfo: IPriceInfo,
    { numberOfPeriods, periodLength }: IConfig
): IPeroidInfo {
    const hourlyPrices = mapPriceInfoToPrices(priceInfo)
    const periodsSorted = mapHoursToPeriods(hourlyPrices, periodLength)
    const { today, tomorrow } = getLowest(periodsSorted)

    return {
        periods: periodsSorted.slice(0, numberOfPeriods),
        lowestToday: today,
        lowestTomorrow: tomorrow,
    }
}
