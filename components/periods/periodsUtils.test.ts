import {
    getPeriods,
    mapHoursToPeriods,
    mapPriceInfoToPrices,
    toPeriod,
} from './periodsUtils'

const MOCK_CONFIG: IConfig = {
    numberOfPeriods: 5,
    periodLength: 3,
}

const MOCK_PRICE = (total: number, startsAt: string): IPrice => ({
    total,
    startsAt,
})

const MOCK_PRICES = (totals: number[]): IPrice[] =>
    totals.map((total, index) => MOCK_PRICE(total, index.toString()))

const MOCK_PRICE_INFO: IPriceInfo = {
    currentStartsAt: '0',
    today: [
        { startsAt: '0', total: 0 },
        { startsAt: '1', total: 1 },
        { startsAt: '2', total: 2 },
    ],
    tomorrow: [
        { startsAt: '3', total: 3 },
        { startsAt: '4', total: 4 },
        { startsAt: '5', total: 5 },
    ],
}

const MOCK_HOURS = MOCK_PRICES([0, 1, 2, 3, 4, 5])

test('toPeriod', () => {
    const period1 = toPeriod('0', 0, MOCK_HOURS, 3)
    const expected1 = { startsAt: '0', total: 3 }
    expect(period1).toStrictEqual(expected1)

    const period2 = toPeriod('1', 1, MOCK_HOURS, 3)
    const expected2 = { startsAt: '1', total: 6 }
    expect(period2).toStrictEqual(expected2)

    const period3 = toPeriod('2', 2, MOCK_HOURS, 3)
    const expected3 = { startsAt: '2', total: 9 }
    expect(period3).toStrictEqual(expected3)

    const period4 = toPeriod('3', 3, MOCK_HOURS, 3)
    const expected4 = { startsAt: '3', total: 12 }
    expect(period4).toStrictEqual(expected4)

    const period5 = toPeriod('4', 4, MOCK_HOURS, 3)
    expect(period5).toBeNull()

    const period6 = toPeriod('5', 5, MOCK_HOURS, 3)
    expect(period6).toBeNull()
})

test('mapPriceInfoToPrices', () => {
    const pricesAll = mapPriceInfoToPrices({ ...MOCK_PRICE_INFO })
    const expectedAll = [
        { startsAt: '0', total: 0 },
        { startsAt: '1', total: 1 },
        { startsAt: '2', total: 2 },
        { startsAt: '3', total: 3 },
        { startsAt: '4', total: 4 },
        { startsAt: '5', total: 5 },
    ]
    expect(pricesAll).toStrictEqual(expectedAll)

    const pricesFromToday = mapPriceInfoToPrices({
        ...MOCK_PRICE_INFO,
        currentStartsAt: '2',
    })
    const expectedFromToday = [
        { startsAt: '2', total: 2 },
        { startsAt: '3', total: 3 },
        { startsAt: '4', total: 4 },
        { startsAt: '5', total: 5 },
    ]
    expect(pricesFromToday).toStrictEqual(expectedFromToday)

    const pricesFromTomorrow = mapPriceInfoToPrices({
        ...MOCK_PRICE_INFO,
        currentStartsAt: '3',
    })
    const expectedFromTomorrow = [
        { startsAt: '3', total: 3 },
        { startsAt: '4', total: 4 },
        { startsAt: '5', total: 5 },
    ]
    expect(pricesFromTomorrow).toStrictEqual(expectedFromTomorrow)
})

test('mapHoursToPeriods', () => {
    const periods = mapHoursToPeriods(MOCK_PRICES([5, 4, 3, 2, 1, 0]), 3)
    const expected = [
        { startsAt: '3', total: 3 },
        { startsAt: '2', total: 6 },
        { startsAt: '1', total: 9 },
        { startsAt: '0', total: 12 },
    ]
    expect(periods).toStrictEqual(expected)
})

test('getPeriods', () => {
    const expectedAll = [
        { startsAt: '0', total: 3 },
        { startsAt: '1', total: 6 },
        { startsAt: '2', total: 9 },
        { startsAt: '3', total: 12 },
    ]
    expect(
        getPeriods(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expectedAll)

    const expected = [
        { startsAt: '0', total: 3 },
        { startsAt: '1', total: 6 },
        { startsAt: '2', total: 9 },
        { startsAt: '3', total: 12 },
    ]
    expect(
        getPeriods(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expected)

    expect(
        getPeriods(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 0 })
    ).toStrictEqual([])
})
