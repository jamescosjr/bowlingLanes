function validateBowlingLane(name) {
            if (typeof name !== 'string' || name.trim() === '') {
            return { valid: false, message: 'The name should be a valid string' };
        }    
    return { valid: true };
}

function validateStartHour(integerHour) {
    if (typeof integerHour !== 'number' || !Number.isInteger(integerHour) || integerHour < 16 || integerHour > 22 || integerHour % 2 !== 0) {
        return { valid: false, message: 'The hour should be an even integer between 16 and 22' };
    }
    return { valid: true };
}

function dateValidation(date) {
    if (isNaN(Date.parse(date))) {
        return { valid: false, message: 'The date is not valid' };
    }
    return { valid: true };
}

module.exports = {
    validateBowlingLane,
    validateStartHour,
    dateValidation,
};