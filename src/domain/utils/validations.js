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

function validateClient(name, documentId, age) {
    if (!name || typeof name !== 'string') {
        return { valid: false, message: 'The name should be a valid string' };
    }
    if (!documentId || typeof documentId !== 'string') {
        return { valid: false, message: 'The document ID should be a valid string' };
    }
    if (!age || typeof age !== 'number') {
        return { valid: false, message: 'The age should be a valid number' };
    }
    return { valid: true };
}

function validateSchedule(date, startHour, bowlingLane) {
    if (!date || !startHour || !bowlingLane) {
        return { valid: false, message: 'All fields are required' };
    }
    if (isNaN(Date.parse(date))) {
        return { valid: false, message: 'The date is not valid' };
    }
    if (typeof startHour !== 'number' || startHour < 16 || startHour > 22 || startHour % 2 !== 0) {
        return { valid: false, message: 'The hour should be an even integer between 16 and 22' };
    }
    if (typeof bowlingLane !== 'string') {
        return { valid: false, message: 'The bowling lane should be a string' };
    }
    return { valid: true };
}

module.exports = {
    validateBowlingLane,
    validateStartHour,
    dateValidation,
    validateClient,
    validateSchedule,
};