import { createBowlingLaneService } from '../../domain/services/bowlingLaneService.js';
import { createBowlingLane } from '../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js';
const dbHandler = require('../../../jest/jest.setup');

jest.mock('../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');

beforeAll(async () => {
    await dbHandler.connect();
});

afterEach(async () => {
    await dbHandler.clearDatabase();
    jest.clearAllMocks();
});

afterAll(async () => {
    await dbHandler.closeDatabase();
});

describe('createBowlingLaneService', () => {
    it('should call createBowlingLane with the correct parameters', async () => {
        const name = 'Lane 1';
        const mockResult = {
            name: 'Lane 1',
            laneSchedule: [],
            id: expect.any(String),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        createBowlingLane.mockResolvedValue(mockResult);

        const result = await createBowlingLaneService(name);

        expect(result).toMatchObject({ 
            name: 'Lane 1',
            laneSchedule: [],
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
        expect(createBowlingLane).toHaveBeenCalledWith(name, []);
    });

    it('should throw an error if creation fails', async () => {
        const name = '';

        createBowlingLane.mockRejectedValue(new Error('Failed to create bowling lane'));

        await expect(createBowlingLaneService(name)).rejects.toThrow('Failed to create bowling lane');
    });
});