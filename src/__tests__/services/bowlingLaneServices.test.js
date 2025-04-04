const { 
    createBowlingLaneService,
    getAllLanesService, 
} = require('../../domain/services/bowlingLaneService.js');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const { AppError } = require('../../domain/erros/customErros.js');


beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
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

describe('getAllLanesService', () => {
    it('should return all lanes', async () => {
        await createBowlingLaneService('Lane 1');
        await createBowlingLaneService('Lane 2');

        const result = await getAllLanesService();

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

        const result = await getAllLanesService();

        expect(result).toHaveLength(0);
    });
});