const { getAllSchedules } = require("../../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryRead.js");
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { createSchedule } = require('../../../infrastructure/repositories/scheduleRepositories/scheduleRepositoryWrite.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('getAllSchedules', () => {
    it ('should return all schedules', async () => {
        const date = new Date(2023, 10, 1);
        const startHour = '16:00';
        const endHour = '18:00';
        const bowlingLaneId = 'Lane 1';
        const clientId = 'Client 1';

        const schedule = await createSchedule(date, startHour, endHour, bowlingLaneId, clientId);

        expect(schedule.toObject()).toMatchObject({
            date,
            startHour,
            endHour,
            bowlingLaneId,
            clientId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });

        const allSchedules = await getAllSchedules({ filter: {}, page: 1, limit: 10 });
        expect(allSchedules).toHaveLength(1);
        expect(allSchedules[0].toObject()).toMatchObject({
            date,
            startHour,
            endHour,
            bowlingLaneId,
            clientId,
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
        });
    });

    it ('should return an empty array if there are no schedules', async () => {
        const allSchedules = await getAllSchedules({ filter: {}, page: 1, limit: 10 });
        expect(allSchedules).toHaveLength(0);
    });
});