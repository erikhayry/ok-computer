export interface IPrice {
    startsAt: string
    total: number
}

export enum DAY {
    TODAY = 'TODAY',
    TOMORROW = 'TOMORROW',
}

export interface IPeriod {
    startsAt: string
    average: number
    day: DAY
    percentageComparedToLowest: number
    percentageComparedToHighest: number
}

export interface IPeroidInfo {
    periods: IPeriod[]
    lowestToday?: IPeriod
    lowestTomorrow?: IPeriod
}

export interface IPriceInfo {
    currentStartsAt: string
    today: IPrice[]
    tomorrow: IPrice[]
}

export interface IConfig {
    numberOfPeriods: number
    periodLength: number
}
