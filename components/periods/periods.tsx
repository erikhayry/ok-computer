import { printCurrency } from '../../utils/currency'
import { toDate } from '../../utils/date'
import { getPeriodInfo } from './periodsUtils'

interface IProps {
    priceInfo: IPriceInfo
}

const CONFIG: IConfig = {
    //numberOfPeriods: 5,
    periodLength: 3,
}

interface IPeriodProps {
    startsAt: string
    average: number
    percentageComparedToLowest: number
}

const Period = ({
    startsAt,
    average,
    percentageComparedToLowest,
}: IPeriodProps) => {
    return (
        <div className="card bg-neutral text-neutral-content">
            <div className="card-body items-center text-center">
                <h2 className="card-title">{toDate(startsAt)}</h2>
                <p>
                    Snittpris: {printCurrency(average)} (
                    {percentageComparedToLowest}% dyrare)
                </p>
            </div>
        </div>
    )
}

export const Periods = ({ priceInfo }: IProps) => {
    const { periods } = getPeriodInfo(priceInfo, CONFIG)

    return (
        <ul>
            {periods.map(
                ({ startsAt, average, percentageComparedToLowest }) => (
                    <li key={startsAt} className="mb-1">
                        <Period
                            startsAt={startsAt}
                            average={average}
                            percentageComparedToLowest={
                                percentageComparedToLowest
                            }
                        />
                    </li>
                )
            )}
        </ul>
    )
}
