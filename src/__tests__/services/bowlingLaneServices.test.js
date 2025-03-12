import { createBowlingLaneService } from '../../domain/services/bowlingLaneService.js';
import * as bowlingLaneRepository from '../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js';
import { connect, closeDatabase, clearDatabase } from '../../../jest/jest.setup.js';
import { AppError } from '../../domain/erros/customErros.js';
import { describe, expect, beforeAll, afterEach, afterAll, it, jest } from '@jest/globals';

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
    jest.clearAllMocks();
});

afterAll(async () => {
    await closeDatabase();
});

describe('createBowlingLaneService', () => {
    it('should call createBowlingLane with the correct parameters', async () => {
        const name = 'Lane 1';

        const result = await createBowlingLaneService(name);

        expect(result).toMatchObject({ 
            name: 'Lane 1',
            laneSchedule: [],
            id: expect.any(String),
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it('should throw an error if creation fails', async () => {
        const name = '';

        await expect(createBowlingLaneService(name)).rejects.toThrowError(AppError);
    });
});
