export function validateBowlingLane(bowlingLane) {
    const { name, laneSchedule } = bowlingLane;
    if (!name || name === '') {
        return 'Bowling lane name is required';
    }
    if (!Array.isArray(laneSchedule) || laneSchedule.some(schedule => {
        const { day, startHour, endHour } = schedule;
        return !day || !startHour || !endHour;
    })) {
        return 'Bowling lane schedule must be an array of objects with day, startHour, and endHour';
    }
    return null;
}