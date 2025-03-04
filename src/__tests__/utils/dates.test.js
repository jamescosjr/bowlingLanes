import { beginOfTheDay } from '../../domain/utils/dates';

describe('beginOfTheDay', () => {
    test('should return the beginning of the day for a given date', () => {
        const date = new Date('2023-10-15T13:45:30Z');
        const result = beginOfTheDay(date);
        expect(result).toEqual(new Date('2023-10-15T00:00:00Z'));
    });

    test('should handle dates at the beginning of the day', () => {
        const date = new Date('2023-10-15T00:00:00Z');
        const result = beginOfTheDay(date);
        expect(result).toEqual(new Date('2023-10-15T00:00:00Z'));
    });

    test('should handle dates at the end of the day', () => {
        const date = new Date('2023-10-15T23:59:59Z');
        const result = beginOfTheDay(date);
        expect(result).toEqual(new Date('2023-10-15T00:00:00Z'));
    });

    test('should handle invalid dates', () => {
        const date = new Date('invalid-date');
        expect(() => beginOfTheDay(date)).toThrow();
    });
});