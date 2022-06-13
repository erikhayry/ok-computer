interface IPrice {
    startsAt: string
    total: number
}

interface IPeriod {
    startsAt: string
    average: number
    percentageComparedToLowest: number
}

interface IPeroidInfo {
    periods: IPeriod[]
    lowestToday: string
    lowestTomorrow: string
}

interface IPriceInfo {
    currentStartsAt: string
    today: IPrice[]
    tomorrow: IPrice[]
}

interface IConfig {
    numberOfPeriods?: number
    periodLength?: number
}
