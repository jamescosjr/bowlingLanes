export default function validateBowlingLane(name) {
            if (typeof name !== 'string' || name.trim() === '') {
            return { valid: false, message: 'The name should be a valid string' };
        }    
    return { valid: true };
}