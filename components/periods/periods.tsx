import { getPeriods, toDate } from './periodsUtils'

interface IProps {
    priceInfo: IPriceInfo
}

export const Periods = ({ priceInfo }: IProps) => {
    const periods = getPeriods(priceInfo, 5)

    return (
        <ul>
            {periods.map(({ startsAt, total }) => (
                <li key={startsAt} className="mb-1">
                    <div className="card bg-neutral text-neutral-content">
                        <div className="card-body items-center text-center">
                            <h2 className="card-title">{toDate(startsAt)}</h2>
                            <p>{total.toFixed(3)}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}
