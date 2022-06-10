


function toPeriod({ startsAt }: IPrice, index: number, arr: IPrice[]): IPrice {
  const dayOnePrice = arr[index].total || 10000;
  const dayTwoPrice = arr[index + 1]?.total || 10000;
  const dayThreePrice = arr[index + 2]?.total || 10000;
  const startsAtDate = new Date(startsAt || 0);
  const startsAtString = `${startsAtDate.toLocaleDateString()} - ${startsAtDate.toLocaleTimeString()}`;
  const total = (dayOnePrice + dayTwoPrice + dayThreePrice)
  
  return { startsAt: startsAtString, total }
}


export function getPeriods(priceInfo: IPriceInfo){
    const { now, today, tomorrow } = priceInfo;
    const nowIndex = today.findIndex(({ startsAt }) => startsAt === now );
    const todayFromNow = today.slice(nowIndex)
    const hours = todayFromNow.concat(tomorrow).map(toPeriod).sort((a, b) => a.total - b.total)

    return hours.slice(0, 5)
}