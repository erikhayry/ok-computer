export function toKrOre(value: number): { kr: number; ore: number } {
    const base = Math.round(value * 100)
    const kr = Math.floor(base / 100)
    const ore = base % 100

    return { kr, ore }
}

export function printCurrency(value: number): string {
    const { kr, ore } = toKrOre(value)
    const kronorStr = kr ? `${kr} kr` : ''
    const oreStr = ore ? `${ore} öre` : ''

    return `${kronorStr} ${oreStr}`.trim()
}
