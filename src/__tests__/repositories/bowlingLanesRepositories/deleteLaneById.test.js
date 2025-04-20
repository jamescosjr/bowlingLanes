const { AppError } = require('../../../domain/erros/customErros.js');
const { createBowlingLane, deleteLaneById } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');
const  { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const BowlingLane = require('../../../infrastructure/schemas/bowlingLaneSchema.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('deleteLaneById', () => {

    it('should delete an existent bowling lane', async () => {
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

        const deleteResult = await deleteLaneById(result._id);
        
        const findResult = await BowlingLane.findById(result._id);
        expect(findResult).toBeNull();
    });
});