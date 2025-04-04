const { AppError } = require('../../../domain/erros/customErros.js');
const { createBowlingLane } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');
const  { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('createBowlingLane', () => {

    it('should create a bowling lane with the given name and schedule', async () => {
        const name = 'Lane 1';
        const laneSchedule = [];

        const result = await createBowlingLane(name, laneSchedule);

        expect(result.toObject()).toMatchObject({
            name,
            laneSchedule,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        expect(result._id).toBeDefined();
    });

    it('should throw an error if creation fails', async () => {
        const name = '';
        const laneSchedule = [];


        await expect(createBowlingLane(name, laneSchedule)).rejects.toThrow(AppError);
    });
});