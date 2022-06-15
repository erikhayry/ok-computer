import { DAY, IPeriod, IPeroidInfo, IPrice, IPriceInfo } from '../../types'
import {
    getDay,
    getLowest,
    getPeriodInfo,
    mapHoursToPeriods,
    mapPriceInfoToPrices,
    toPeriod,
    toPrice,
} from './periodsUtils'

const SECOND = 1000
const MINUTE = 60 * SECOND
const HOUR = 60 * MINUTE
const FULL_DAY = HOUR * 24

function toString(date: number): string {
    return new Date(date).toLocaleString()
}

function addHour(date: number, hours = 1): string {
    return toString(new Date(date).getTime() + HOUR * hours)
}

const today = new Date().setHours(0, 0, 0, 0)
const MOCK_DAY_1_0 = toString(today)
const MOCK_DAY_1_1 = addHour(today)
const MOCK_DAY_1_2 = addHour(today, 2)

const tomorrow = new Date(new Date(today).getTime() + FULL_DAY).getTime()
const MOCK_DAY_2_0 = toString(tomorrow)
const MOCK_DAY_2_1 = addHour(tomorrow)
const MOCK_DAY_2_2 = addHour(tomorrow, 2)

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
    const period1 = toPeriod(MOCK_DAY_1_1, 4, 2, 8, 5)
    const expected1: IPeriod = {
        average: 0.8,
        percentageComparedToLowest: 100,
        percentageComparedToHighest: 50,
        startsAt: MOCK_DAY_1_1,
        day: DAY.TODAY,
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

const EXPTECTED_PERIODS_ALL: IPeriod[] = [
    {
        average: 1,
        percentageComparedToLowest: 0,
        percentageComparedToHighest: 75,
        startsAt: MOCK_DAY_1_0,
        day: DAY.TODAY,
    },
    {
        average: 2,
        percentageComparedToLowest: 100,
        percentageComparedToHighest: 50,
        startsAt: MOCK_DAY_1_1,
        day: DAY.TODAY,
    },
    {
        average: 3,
        percentageComparedToLowest: 200,
        percentageComparedToHighest: 25,
        startsAt: MOCK_DAY_1_2,
        day: DAY.TODAY,
    },
    {
        average: 4,
        percentageComparedToLowest: 300,
        percentageComparedToHighest: 0,
        startsAt: MOCK_DAY_2_0,
        day: DAY.TOMORROW,
    },
]

test('mapHoursToPeriods', () => {
    const periods = mapHoursToPeriods(MOCK_HOURS, 3)
    expect(periods).toStrictEqual(EXPTECTED_PERIODS_ALL)
})

test('getPeriodInfo', () => {
    const expectedAll: IPeroidInfo = {
        periods: EXPTECTED_PERIODS_ALL,
        lowestToday: EXPTECTED_PERIODS_ALL[0],
        lowestTomorrow: EXPTECTED_PERIODS_ALL[3],
    }
    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expectedAll)

    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 3 })
    ).toStrictEqual(expectedAll)

    expect(
        getPeriodInfo(MOCK_PRICE_INFO, { numberOfPeriods: 4, periodLength: 0 })
    ).toStrictEqual({
        periods: [],
        lowestToday: undefined,
        lowestTomorrow: undefined,
    })
})

test('getDay', () => {
    expect(getDay(MOCK_DAY_1_0)).toEqual(DAY.TODAY)
    expect(getDay(MOCK_DAY_2_0)).toEqual(DAY.TOMORROW)
})

test('getLowest', () => {
    const lowestPeriods = getLowest(EXPTECTED_PERIODS_ALL)
    expect(lowestPeriods.today).toEqual(EXPTECTED_PERIODS_ALL[0])
    expect(lowestPeriods.tomorrow).toEqual(EXPTECTED_PERIODS_ALL[3])

    const [firstToday, sedondToday, thirdToday] = EXPTECTED_PERIODS_ALL
    const lowestUnsortedTodayOnly = getLowest([
        sedondToday,
        thirdToday,
        firstToday,
    ])
    expect(lowestUnsortedTodayOnly.today).toEqual(EXPTECTED_PERIODS_ALL[0])
    expect(lowestUnsortedTodayOnly.tomorrow).toBeUndefined()
})
