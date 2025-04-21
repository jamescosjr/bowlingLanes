const {createSchedule} = require('../../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryWrite.js');
const { AppError } = require('../../../domain/erros/customErros.js');
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

describe('createSchedule', () => {
    it ('should create a schedule with the given parameters', async () => {
        const date = new Date();
        const startHour = '10:00';
        const endHour = '11:00';
        const bowlingLaneId = '68064023a077979f1dc72570';
        const clientId = '680640358b62777b03fbf0b0';

        const result = await createSchedule(date, startHour, endHour, bowlingLaneId, clientId);

        expect(result.toObject()).toMatchObject({
            date,
            startHour,
            endHour,
            bowlingLaneId,
            clientId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        expect(result._id).toBeDefined();
    });

    it ('should throw an error if creation fails', async () => {
        const date = new Date();
        const endHour = '11:00';
        const bowlingLaneId = '68064023a077979f1dc72570';
        const clientId = '680640358b62777b03fbf0b0';

        await expect(createSchedule(date, endHour, bowlingLaneId, clientId)).rejects.toThrow(AppError);
    });
});