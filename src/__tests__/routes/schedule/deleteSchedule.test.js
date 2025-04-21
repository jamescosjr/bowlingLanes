const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { createClientService } = require('../../../domain/services/clientService.js');
const { createBowlingLaneService } = require('../../../domain/services/bowlingLaneService.js');
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

describe('DELETE /schedules/:id', () => {
    it ('should delete a schedule by ID', async () => {
        const laneName = 'Lane 1';
        const newLane = await createBowlingLaneService(laneName);

        const clientName = 'John Doe';
        const clientDocumentId = '123456789';
        const clientAge = 30;
        const newClient = await createClientService(clientName, clientDocumentId, clientAge);

        const newSchedule = {
            date: new Date(2023, 10, 1),
            startHour: '16:00',
            endHour: '18:00',
            bowlingLaneId: newLane._id,
            clientId: newClient._id,
        };

        const scheduleResponse = await createSchedule(
            newSchedule.date,
            newSchedule.startHour,
            newSchedule.endHour,
            newSchedule.bowlingLaneId,
            newSchedule.clientId
        );
        const scheduleId = scheduleResponse._id;

        const response = await supertest(app).delete(`/schedules/${scheduleId}`);

        expect(response.status).toBe(204);
    });

    it ('should return 500 if the schedule does not exist', async () => {
        const invalidId = 'invalid_id';

        const response = await supertest(app).delete(`/schedules/${invalidId}`);

        expect(response.status).toBe(500);
    });
});