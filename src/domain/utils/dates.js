function dateWithoutTime(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

module.exports = dateWithoutTime;