import { IPrice } from '../types'
import { ViewerHomesQuery } from './generated'
import {
    mapToPricesWithData,
    mapViewerHomesQueryToPriceInfo,
    outPriceWithoutData,
    outUndefined,
} from './utils'

const MOCK_PRICE_1: IPrice = { total: 0, startsAt: '' }

const MOCK_PRICE_2: IPrice = {
    total: 100,
    startsAt: '2022-06-10T12:00:00.000+02:00',
}

test('outPriceWithoutData', () => {
    expect(outPriceWithoutData(null)).toBeFalsy()
    expect(outPriceWithoutData({})).toBeFalsy()
    expect(outPriceWithoutData({})).toBeFalsy()
    expect(outPriceWithoutData({ startsAt: '' })).toBeFalsy()
    expect(outPriceWithoutData({ total: undefined })).toBeFalsy()
    expect(outPriceWithoutData({ total: 0 })).toBeFalsy()
    expect(outPriceWithoutData(MOCK_PRICE_1)).toBeTruthy()
    expect(outPriceWithoutData(MOCK_PRICE_2)).toBeTruthy()
})

test('outUndefined', () => {
    expect(outUndefined(undefined)).toBeFalsy()
    expect(outUndefined(null)).toBeFalsy()
    expect(outUndefined(0)).toBeTruthy()
    expect(outUndefined({})).toBeTruthy()
    expect(outUndefined('')).toBeTruthy()
})

test('mapToPricesWithData', () => {
    const MOCK_FALSY_PRICES = [
        null,
        {},
        { startsAt: null },
        { startsAt: undefined },
        { total: null },
        { total: undefined },
        { startsAt: null, total: null },
        { startsAt: null, total: undefined },
        { startsAt: undefined, total: undefined },
        { startsAt: undefined, total: null },
        { startsAt: '' },
        { total: 0 },
    ]
    expect(mapToPricesWithData()).toEqual([])
    expect(
        mapToPricesWithData([...MOCK_FALSY_PRICES, MOCK_PRICE_1, MOCK_PRICE_2])
    ).toEqual([MOCK_PRICE_1, MOCK_PRICE_2])
})

const MOCK_HOME = {
    currentSubscription: {
        priceInfo: {
            current: {
                startsAt: '1',
            },
            today: [
                {
                    startsAt: '1',
                    total: 100,
                },
            ],
            tomorrow: [
                {
                    startsAt: '2',
                    total: 200,
                },
            ],
        },
    },
}

const MOCK_EMPTY_VIEWER: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [],
    },
}

const MOCK_NO_SUB_VIEWER: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [{}],
    },
}

const MOCK_NO_CURRENT_VIEWER: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [
            {
                currentSubscription: {
                    priceInfo: {
                        ...MOCK_HOME.currentSubscription.priceInfo,
                        current: undefined,
                    },
                },
            },
        ],
    },
}

const MOCK_EMPTY_TODAY_VIEWER: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [
            {
                currentSubscription: {
                    priceInfo: {
                        ...MOCK_HOME.currentSubscription.priceInfo,
                        today: [],
                    },
                },
            },
        ],
    },
}

const MOCK_EMPTY_TOMORROW_VIEWER: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [
            {
                currentSubscription: {
                    priceInfo: {
                        ...MOCK_HOME.currentSubscription.priceInfo,
                        tomorrow: [],
                    },
                },
            },
        ],
    },
}

const MOCK_VIEWER_WITH_HOME: ViewerHomesQuery = {
    viewer: {
        __typename: undefined,
        homes: [MOCK_HOME],
    },
}

test('mapViewerHomesQueryToPriceInfo', () => {
    expect(mapViewerHomesQueryToPriceInfo(MOCK_EMPTY_VIEWER)).toBeUndefined()
    expect(mapViewerHomesQueryToPriceInfo(MOCK_NO_SUB_VIEWER)).toBeUndefined()
    expect(
        mapViewerHomesQueryToPriceInfo(MOCK_NO_CURRENT_VIEWER)
    ).toBeUndefined()
    expect(mapViewerHomesQueryToPriceInfo(MOCK_EMPTY_TODAY_VIEWER)).toEqual({
        currentStartsAt: '1',
        today: [],
        tomorrow: [{ startsAt: '2', total: 200 }],
    })
    expect(mapViewerHomesQueryToPriceInfo(MOCK_EMPTY_TOMORROW_VIEWER)).toEqual({
        currentStartsAt: '1',
        today: [{ startsAt: '1', total: 100 }],
        tomorrow: [],
    })
    expect(mapViewerHomesQueryToPriceInfo(MOCK_VIEWER_WITH_HOME)).toEqual({
        currentStartsAt: '1',
        today: [{ startsAt: '1', total: 100 }],
        tomorrow: [{ startsAt: '2', total: 200 }],
    })
})
