import { getPeriods } from "./hoursUtils"

interface IProps {
    priceInfo: IPriceInfo
}

export const Hours = ({priceInfo}: IProps) => {
    const periods = getPeriods(priceInfo)
    
    return <ul>
        {periods.map(({ startsAt, total }) => (<li key={startsAt}>{startsAt} ({total.toFixed(3)})</li>))}
    </ul>
}