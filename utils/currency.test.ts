import { printCurrency } from './currency'

test('printCurrency', () => {
    expect(printCurrency(0.1)).toEqual('10 öre')
    expect(printCurrency(0.101)).toEqual('10 öre')
    expect(printCurrency(0.11)).toEqual('11 öre')
    expect(printCurrency(0.99)).toEqual('99 öre')
    expect(printCurrency(0.994)).toEqual('99 öre')
    expect(printCurrency(0.995)).toEqual('1 krona')
    expect(printCurrency(1)).toEqual('1 krona')
    expect(printCurrency(1.5)).toEqual('1 krona 50 öre')
    expect(printCurrency(2)).toEqual('2 kronor')
    expect(printCurrency(2.1)).toEqual('2 kronor 10 öre')
})
