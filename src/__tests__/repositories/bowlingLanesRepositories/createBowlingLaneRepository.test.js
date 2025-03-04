import { AppError } from '../../../domain/erros/customErros.js';
import { createBowlingLane } from '../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js';
const dbHandler = require('../../../../jest/jest.setup');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
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

    it('should throw an error if wrong laneSchedule', async () => {
        const name = 'Lane 1';
        const laneSchedule = 2;


        await expect(createBowlingLane(name, laneSchedule)).rejects.toThrow(AppError);
    });
});