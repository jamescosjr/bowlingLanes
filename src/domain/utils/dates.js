export function beginOfTheDay(date) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('Invalid date');
    }

    return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0, 0));
}