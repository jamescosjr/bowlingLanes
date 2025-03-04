import { dateWithoutTime } from '../../domain/utils/dates';

describe('dateWithoutTime', () => {
        test('should return a date without time', () => {
            const date = new Date('2023-10-05T14:48:00.000Z');
            const result = dateWithoutTime(date);
            expect(result).toEqual(new Date(2023, 9, 5));
        });

        test('should handle different time zones correctly', () => {
            const date = new Date('2023-10-05T00:00:00.000-05:00');
            const result = dateWithoutTime(date);
            expect(result).toEqual(new Date(2023, 9, 5));
        });

        test('should handle dates at the end of the month', () => {
            const date = new Date('2023-10-31T23:59:59.999Z');
            const result = dateWithoutTime(date);
            expect(result).toEqual(new Date(2023, 9, 31));
        });

        test('should handle leap years correctly', () => {
            const date = new Date('2024-02-29T12:00:00.000Z');
            const result = dateWithoutTime(date);
            expect(result).toEqual(new Date(2024, 1, 29));
        });

        test('should handle invalid dates', () => {
            const date = new Date('invalid-date');
            const result = dateWithoutTime(date);
            expect(result.toString()).toBe('Invalid Date');
        });
    });