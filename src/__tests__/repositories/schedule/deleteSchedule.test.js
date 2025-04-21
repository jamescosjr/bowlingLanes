const {createSchedule, deleteSchedule} = require('../../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryWrite.js');
const {getAllSchedules} = require('../../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryRead.js');
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

describe('deleteSchedule', () => {
    it ('should delete a schedule with the given id', async () => {
        const date = new Date();
        const startHour = '10:00';
        const endHour = '11:00';
        const bowlingLaneId = '68064023a077979f1dc72570';
        const clientId = '680640358b62777b03fbf0b0';

        const schedule = await createSchedule(date, startHour, endHour, bowlingLaneId, clientId);
        await deleteSchedule(schedule._id);

        expect(schedule._id).toBeDefined();

        const allSchedules = await getAllSchedules();

        expect(allSchedules).toHaveLength(0);
    });

    it ('should throw an error if deletion fails', async () => {
        const invalidId = 'invalid_id';

        await expect(deleteSchedule(invalidId)).rejects.toThrow(AppError);
    });
});