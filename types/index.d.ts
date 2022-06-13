interface IPrice {
    startsAt: string
    total: number
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
