const { getLanesBySchedule } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { createBowlingLane, addScheduleOnLane } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('getLanesBySchedule', () => {
    it('should return all lanes', async () => {
        await createBowlingLane('Lane 1', []);
        await createBowlingLane('Lane 2', []);
        await createBowlingLane('Lane 3', []);
        await createBowlingLane('Lane 4', []);
    
        const rawDate = new Date(2025, 7, 12); 
        rawDate.setUTCHours(0, 0, 0, 0); 
    
        await addScheduleOnLane('Lane 1', {
            date: rawDate,
            startHour: '10:00',
            endHour: '12:00',
        });
        await addScheduleOnLane('Lane 2', {
            date: rawDate,
            startHour: '10:00',
            endHour: '12:00',
        });
    
        const result = await getLanesBySchedule({
            date: rawDate,
            startHour: '10:00',
            endHour: '12:00',
        });
    
        const normalizedResult = result.map(lane => ({
            ...lane,
            laneSchedule: lane.laneSchedule.map(s => ({
                ...s,
                date: s.date.toISOString(),
            })),
        }));
    
        expect(normalizedResult).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Lane 1',
                    laneSchedule: [
                        expect.objectContaining({
                            date: rawDate.toISOString(),
                            startHour: '10:00',
                            endHour: '12:00',
                        }),
                    ],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
                expect.objectContaining({
                    name: 'Lane 2',
                    laneSchedule: [
                        expect.objectContaining({
                            date: rawDate.toISOString(),
                            startHour: '10:00',
                            endHour: '12:00',
                        }),
                    ],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
            ])
        );
    });
    

    it('should return an empty array if there are no lanes', async () => {
        const rawDate = new Date(2025, 7, 12); 
        rawDate.setUTCHours(0, 0, 0, 0); 
        const result = await getLanesBySchedule({
            date: rawDate,
            startHour: '10:00',
            endHour: '12:00',
        });

        expect(result).toHaveLength(0);
    });
});