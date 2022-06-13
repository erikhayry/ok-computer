import { printCurrency } from '../../utils/currency'
import { toDate } from '../../utils/date'
import { getPeriods } from './periodsUtils'

interface IProps {
    priceInfo: IPriceInfo
}

const CONFIG: IConfig = {
    //numberOfPeriods: 5,
    periodLength: 3,
}

interface IPeriodProps {
    total: number
    startsAt: string
    periodLength: number
    lowestPrice: number
}

const Period = ({
    total,
    startsAt,
    periodLength,
    lowestPrice,
}: IPeriodProps) => {
    const price = total / periodLength

    return (
        <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{toDate(startsAt)}</h2>
                <p>
                    Snittpris: {printCurrency(price)} (
                    {Math.round((price / lowestPrice) * 100 - 100)}% dyrare)
                </p>
            </div>
        </div>
    )
}

export const Periods = ({ priceInfo }: IProps) => {
    const periods = getPeriods(priceInfo, CONFIG)
    const periodLength = CONFIG.periodLength || 1
    const lowestPrice = periods[0].total / periodLength

    return (
        <ul>
            {periods.map(({ startsAt, total }) => (
                <li key={startsAt} className="mb-1">
                    <Period
                        startsAt={startsAt}
                        total={total}
                        periodLength={periodLength}
                        lowestPrice={lowestPrice}
                    />
                </li>
            ))}
        </ul>
    )
}
