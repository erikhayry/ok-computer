export function toDate(dateString: string) {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    }
    return date.toLocaleDateString('sv-SE', options)
}
