import { getPeriods, toDate } from "./periodsUtils"

interface IProps {
    priceInfo: IPriceInfo
}

export const Periods = ({priceInfo}: IProps) => {    
    const periods = getPeriods(priceInfo)    
    
    return <ul>
        {periods.map(({ startsAt, total }) => (<li key={startsAt} className="text-3xl font-bold underline">{toDate(startsAt)} ({total.toFixed(3)})</li>))}
    </ul>
}