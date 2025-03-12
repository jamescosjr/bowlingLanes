import { getAllLanes } from '../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead';
import * as bowlingLaneRepositoryRead from '../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js';
import { describe, expect, it, jest } from '@jest/globals';import  { connect, closeDatabase, clearDatabase } from '../../../../jest/jest.setup';
import { AppError } from '../../../domain/erros/customErros';

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
});