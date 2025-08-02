const { getAllLanes } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { createBowlingLane } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('getAllLanes', () => {
    it('should return all lanes', async () => {
       await createBowlingLane('Lane 1', [] );
       await createBowlingLane('Lane 2', [] );

        const result = await getAllLanes();

        expect(result).toHaveLength(2);
        expect(result).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: 'Lane 1',
                    laneSchedule: [],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
                expect.objectContaining({
                    name: 'Lane 2',
                    laneSchedule: [],
                    createdAt: expect.any(Date),
                    updatedAt: expect.any(Date),
                }),
            ]),
        );
    });

    it('should return an empty array if there are no lanes', async () => {
        const result = await getAllLanes();

        expect(result).toHaveLength(0);
    });

    it('should return more than 10 lanes with pagination', async () => {
        for (let i = 1; i <= 15; i++) {
            await createBowlingLane(`Lane ${i}`, []);
        }

        const result = await getAllLanes({}, 2, 10);

        expect(result).toHaveLength(5);
        expect(result[0].name).toBe('Lane 11');
        expect(result[4].name).toBe('Lane 15');
    });
});