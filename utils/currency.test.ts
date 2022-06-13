import { printCurrency, toKrOre } from './currency'

test('toKrOre', () => {
    expect(toKrOre(0.1)).toEqual({ kr: 0, ore: 10 })
    expect(toKrOre(0.5)).toEqual({ kr: 0, ore: 50 })
    expect(toKrOre(0.5555)).toEqual({ kr: 0, ore: 56 })
    expect(toKrOre(0.95)).toEqual({ kr: 0, ore: 95 })
    expect(toKrOre(0.994)).toEqual({ kr: 0, ore: 99 })
    expect(toKrOre(0.995)).toEqual({ kr: 1, ore: 0 })
    expect(toKrOre(1.5)).toEqual({ kr: 1, ore: 50 })
    expect(toKrOre(1.995)).toEqual({ kr: 2, ore: 0 })
})

test('printCurrency', () => {
    expect(printCurrency(0.1)).toEqual('10 öre')
    expect(printCurrency(0.101)).toEqual('10 öre')
    expect(printCurrency(0.11)).toEqual('11 öre')
    expect(printCurrency(0.99)).toEqual('99 öre')
    expect(printCurrency(0.994)).toEqual('99 öre')
    expect(printCurrency(0.995)).toEqual('1 kr')
    expect(printCurrency(1)).toEqual('1 kr')
    expect(printCurrency(1.5)).toEqual('1 kr 50 öre')
    expect(printCurrency(2)).toEqual('2 kr')
    expect(printCurrency(2.1)).toEqual('2 kr 10 öre')
})
