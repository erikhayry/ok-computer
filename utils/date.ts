const TIME_OPTIONS: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
}

const OPTIONS: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    ...TIME_OPTIONS,
}

const LOCALE = 'sv-SE'

function toLocaleString(
    dateString: string,
    options: Intl.DateTimeFormatOptions
): string {
    return new Date(dateString).toLocaleString(LOCALE, options)
}

export function toDate(dateString: string) {
    return toLocaleString(dateString, OPTIONS)
}

export function toTime(dateString: string) {
    return toLocaleString(dateString, TIME_OPTIONS)
}
