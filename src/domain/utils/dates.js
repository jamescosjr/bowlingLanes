function normalizeDate(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
}


  function integerToStringHour(integerHour) {
    return `${integerHour.toString().padStart(2, '0')}:00`;
}

module.exports = {
    normalizeDate,
    integerToStringHour
};