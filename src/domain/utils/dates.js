export function dateWithoutTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}