export function validateBowlingLane(bowlingLane) {
    const { name, laneSchedule, createdAt, updatedAt } = bowlingLane;
    if (!name || name === '') {
        return 'Bowling lane name is required';
    }
    if (!laneSchedule) {
        return 'Bowling lane schedule is required';
    }
    return null;
}