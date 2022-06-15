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
    isNow: boolean
}

const COPY = {
    [DAY.TODAY]: 'Idag',
    [DAY.TOMORROW]: 'Imorgon',
}

const Label = ({ copy, color }: { copy: string; color: string }) => {
    return (
        <div
            className={`text-xs px-4 py-1 rounded-xl min-w-[100px] flex justify-center ${color}`}
        >
            {copy}
        </div>
    )
}

const Period = ({
    startsAt,
    average,
    day,
    percentageComparedToLowest,
    percentageComparedToHighest,
    isNow,
}: IPeriodProps) => {
    const dayClassName = day === DAY.TODAY ? 'bg-gray-400' : 'bg-gray-200'
    const nowClassName = isNow ? 'bg-pink-400' : 'bg-black'

    return (
        <div
            className={`mb-4  text-black  flex gap-2 rounded-lg overflow-hidden uppercase ${nowClassName}`}
        >
            <div
                className={`flex flex-col justify-center items-center p-4 w-[100px] ${dayClassName}`}
            >
                <div className="text-xs">{COPY[day]}</div>
                <div className="text-xl strong">{toTime(startsAt)}</div>
            </div>
            <div className="flex-grow flex flex-col justify-center items-center text-lg p-t-4 p-b-4 gap-1 text-white">
                <div className="text-xs">Snittpris</div>
                <div className="text-xl strong">{printCurrency(average)}</div>
            </div>
            <div className="flex flex-col items-center justify-evenly p-4 gap-4">
                {Boolean(percentageComparedToLowest) && (
                    <Label
                        copy={`${percentageComparedToLowest}% dyrare`}
                        color="bg-red-100"
                    />
                )}
                {Boolean(percentageComparedToHighest) && (
                    <Label
                        copy={`${percentageComparedToHighest}% billigare`}
                        color="bg-green-100"
                    />
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
                    <p className="flex-grow flex justify-center">
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
                        <Period
                            {...period}
                            isNow={
                                priceInfo.currentStartsAt === period.startsAt
                            }
                        />
                    </li>
                ))}
            </ul>
        </>
    )
}
