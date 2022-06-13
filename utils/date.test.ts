import { toDate } from './date'

test('toDate', () => {
    expect(toDate('2022-06-10T00:00:00.000+02:00')).toEqual(
        'fredag 10 juni 00:00'
    )
    expect(toDate('2022-06-10T12:00:00.000+02:00')).toEqual(
        'fredag 10 juni 12:00'
    )
})
