const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { createClientService } = require('../../../domain/services/clientService.js');
const { createBowlingLaneService } = require('../../../domain/services/bowlingLaneService.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('POST /schedules', () => {
    it('should create a new schedule', async () => {
        const laneName = 'Lane 1';
            const newLane = await createBowlingLaneService(laneName);
    
            const clientName = 'John Doe';
            const clientDocumentId = '123456789';
            const clientAge = 30;
            const newClient = await createClientService(clientName, clientDocumentId, clientAge);

        const newSchedule = {
            date: new Date(2023, 10, 1),
            startHour: 16,
            bowlingLaneId: newLane._id,
            clientId: newClient._id,
        };

        const response = await supertest(app).post('/schedules').send(newSchedule);

        expect(response.status).toBe(201);
    });

    it ('should return 400 if the schedule data is invalid', async () => {
        const invalidSchedule = {
            date: '',
            startHour: '16:00',
            bowlingLaneId: 'Lane 1',
            clientId: 'Client 1',
        };

        const response = await supertest(app).post('/schedules').send(invalidSchedule);
        expect(response.status).toBe(400);
    });
});