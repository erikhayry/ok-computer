interface IPrice {
    startsAt: string;
    total: number;
}

interface IPriceInfo {
    now: string
    today: IPrice[]
    tomorrow: IPrice[]
}
  