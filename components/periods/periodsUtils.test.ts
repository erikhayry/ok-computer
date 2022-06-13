import {
    getPeriodInfo,
    mapHoursToPeriods,
    mapPriceInfoToPrices,
    toPeriod,
    toPrice,
} from './periodsUtils'

const MOCK_DAY_1_0 = '2022-06-10T00:00:00.000+02:00'
const MOCK_DAY_1_1 = '2022-06-10T01:00:00.000+02:00'
const MOCK_DAY_1_2 = '2022-06-10T02:00:00.000+02:00'
const MOCK_DAY_2_0 = '2022-06-11T00:00:00.000+02:00'
const MOCK_DAY_2_1 = '2022-06-11T01:00:00.000+02:00'
const MOCK_DAY_2_2 = '2022-06-11T02:00:00.000+02:00'

const MOCK_HOURS_TODAY = [
    { startsAt: MOCK_DAY_1_0, total: 0 },
    { startsAt: MOCK_DAY_1_1, total: 1 },
    { startsAt: MOCK_DAY_1_2, total: 2 },
]

const MOCK_HOURS_TOMORROW = [
    { startsAt: MOCK_DAY_2_0, total: 3 },
    { startsAt: MOCK_DAY_2_1, total: 4 },
    { startsAt: MOCK_DAY_2_2, total: 5 },
]

const MOCK_HOURS: IPrice[] = [...MOCK_HOURS_TODAY, ...MOCK_HOURS_TOMORROW]

const MOCK_PRICE_INFO: IPriceInfo = {
    currentStartsAt: MOCK_DAY_1_0,
    today: MOCK_HOURS_TODAY,
    tomorrow: MOCK_HOURS_TOMORROW,
}

test('toPrice', () => {
    const period1 = toPrice(MOCK_DAY_1_0, 0, MOCK_HOURS, 3)
    const expected1 = { startsAt: MOCK_DAY_1_0, total: 3 }
    expect(period1).toStrictEqual(expected1)

    const period2 = toPrice(MOCK_DAY_1_1, 1, MOCK_HOURS, 3)
    const expected2 = { startsAt: MOCK_DAY_1_1, total: 6 }
    expect(period2).toStrictEqual(expected2)

    const period3 = toPrice(MOCK_DAY_1_2, 2, MOCK_HOURS, 3)
    const expected3 = { startsAt: MOCK_DAY_1_2, total: 9 }
    expect(period3).toStrictEqual(expected3)

    const period4 = toPrice(MOCK_DAY_2_0, 3, MOCK_HOURS, 3)
    const expected4 = { startsAt: MOCK_DAY_2_0, total: 12 }
    expect(period4).toStrictEqual(expected4)

    const period5 = toPrice(MOCK_DAY_2_1, 4, MOCK_HOURS, 3)
    expect(period5).toBeNull()

    const period6 = toPrice(MOCK_DAY_2_2, 5, MOCK_HOURS, 3)
    expect(period6).toBeNull()
})

test('toPeriod', () => {
    const period1 = toPeriod(MOCK_DAY_1_1, 4, 2, 5)
    const expected1 = {
        average: 0.8,
        percentageComparedToLowest: 100,
        startsAt: MOCK_DAY_1_1,
    }
    expect(period1).toStrictEqual(expected1)
})

test('mapPriceInfoToPrices', () => {
    const pricesAll = mapPriceInfoToPrices({ ...MOCK_PRICE_INFO })
    expect(pricesAll).toStrictEqual(MOCK_HOURS)

    const pricesLaterFromToday = mapPriceInfoToPrices({
        ...MOCK_PRICE_INFO,
        currentStartsAt: MOCK_DAY_1_2,
    })
    const expectedLaterFromToday = [
        { startsAt: MOCK_DAY_1_2, total: 2 },
        ...MOCK_HOURS_TOMORROW,
    ]
    expect(pricesLaterFromToday).toStrictEqual(expectedLaterFromToday)

    const pricesFromTomorrow = mapPriceInfoToPrices({
        ...MOCK_PRICE_INFO,
        currentStartsAt: MOCK_DAY_2_0,
    })
    expect(pricesFromTomorrow).toStrictEqual(MOCK_HOURS_TOMORROW)
})

test('mapHoursToPeriods', () => {
    const periods = mapHoursToPeriods(MOCK_HOURS, 3)
    const expected = [
        { startsAt: MOCK_DAY_1_0, average: 1, percentageComparedToLowest: 0 },
        {
            startsAt: MOCK_DAY_1_1,
            average: 2,
            percentageComparedToLowest: 100,
        },
        {
            startsAt: MOCK_DAY_1_2,
            average: 3,
            percentageComparedToLowest: 200,
        },

        {
            startsAt: MOCK_DAY_2_0,
            average: 4,
            percentageComparedToLowest: 300,
        },
    ]
    expect(periods).toStrictEqual(expected)
})

test('getPeriodInfo', () => {
    const expectedAll = {
        lowestToday: '',
        lowestTomorrow: '',
        periods: [
            {
                average: 1,
                percentageComparedToLowest: 0,
                startsAt: MOCK_DAY_1_0,
            },
            {
                average: 2,
                percentageComparedToLowest: 100,
                startsAt: MOCK_DAY_1_1,
            },
            {
                average: 3,
                percentageComparedToLowest: 200,
                startsAt: MOCK_DAY_1_2,
            },
            {
                average: 4,
                percentageComparedToLowest: 300,
                startsAt: MOCK_DAY_2_0,
            },
        ],
    }
    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expectedAll)

    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expectedAll)

    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 0 })
    ).toStrictEqual({ lowestToday: '', lowestTomorrow: '', periods: [] })
})
