function getOre(value: number) {
    if (value > 0) {
        const ore = value * 100

        return `${ore.toFixed()} öre`
    }

    return ''
}

export function printCurrency(value: number): string {
    if (value < 0.995) {
        return getOre(value)
    }
    const kronor = value < 1 ? 1 : Math.floor(value)
    const ore = getOre(value - kronor)
    const oreString = ore ? ` ${ore}` : ''
    const denomination = kronor < 2 ? 'krona' : 'kronor'

    return `${kronor} ${denomination}${oreString}`
}
