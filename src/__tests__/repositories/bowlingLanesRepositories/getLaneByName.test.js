const { getLaneByName } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js');
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

describe('getLaneByName', () => {
    it('should return lane by name', async () => {
        await createBowlingLane('Lane 1', [] );
        await createBowlingLane('Lane 8', [] );

        const name = 'Lane 1';
 
         const result = await getLaneByName(name);
 
         expect(result).toEqual(
                 expect.objectContaining({
                     name: 'Lane 1',
                     laneSchedule: [],
                     createdAt: expect.any(Date),
                     updatedAt: expect.any(Date),
                 }),
         );
    });
});