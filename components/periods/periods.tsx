import classnames, {
    display,
    flexGrow,
    justifyContent,
} from 'tailwindcss-classnames'
import { DAY, IConfig, IPriceInfo } from '../../types'
import { printCurrency } from '../../utils/currency'
import { toTime } from '../../utils/date'
import { getPeriodInfo } from './periodsUtils'

interface IProps {
    priceInfo: IPriceInfo
}

const CONFIG: IConfig = {
    numberOfPeriods: 48,
    periodLength: 3,
}

interface IPeriodProps {
    startsAt: string
    average: number
    day: DAY
    percentageComparedToLowest: number
    percentageComparedToHighest: number
}

const COPY = {
    [DAY.TODAY]: 'Idag',
    [DAY.TOMORROW]: 'Imorgon',
}

const Period = ({
    startsAt,
    average,
    day,
    percentageComparedToLowest,
    percentageComparedToHighest,
}: IPeriodProps) => {
    return (
        <div className="p-2 mb-2 bg-white text-black flex gap-2 rounded">
            <div className="flex items-center">
                <h2>
                    {COPY[day]} {toTime(startsAt)}
                </h2>
            </div>
            <div className="flex-grow flex justify-center items-center">
                <p>Snittpris: {printCurrency(average)}</p>
            </div>
            <div className="flex flex-col items-center">
                {Boolean(percentageComparedToLowest) && (
                    <p>{percentageComparedToLowest}% dyrare</p>
                )}
                {Boolean(percentageComparedToHighest) && (
                    <p>{percentageComparedToHighest}% billigare</p>
                )}
            </div>
        </div>
    )
}

export const Periods = ({ priceInfo }: IProps) => {
    const { periods, lowestToday, lowestTomorrow } = getPeriodInfo(
        priceInfo,
        CONFIG
    )

    return (
        <>
            <div className="p-2 mb-2 flex hidden">
                {lowestToday && (
                    <p
                        className={classnames(
                            display('flex'),
                            flexGrow('grow'),
                            justifyContent('justify-center')
                        )}
                    >
                        Lägst idag {toTime(lowestToday.startsAt)} (
                        {printCurrency(lowestToday.average)})
                    </p>
                )}
                {lowestTomorrow && (
                    <p className="flex-grow flex justify-center">
                        Lägst imorgon {toTime(lowestTomorrow.startsAt)} (
                        {printCurrency(lowestTomorrow.average)})
                    </p>
                )}
            </div>
            <ul>
                {periods.map((period) => (
                    <li key={period.startsAt}>
                        <Period {...period} />
                    </li>
                ))}
            </ul>
        </>
    )
}
