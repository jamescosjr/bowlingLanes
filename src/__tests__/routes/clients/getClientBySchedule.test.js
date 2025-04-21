const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { addScheduleOnClient, createClient } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryWrite.js');
const { getClientById } = require('../../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /clients/schedule', () => {
    it('should return all clients with the specified schedule', async () => {
        
            const name = 'John Doe';
            const documentId = '123456789';
            const clientSchedule = [];
            const age = 30;
        
        const result = await createClient(name, clientSchedule, documentId, age);       
        
        const newClientSchedule = {
            date: new Date(2023, 9, 12),
            startHour: '16:00',
            endHour: '18:00',
            bowlingLane: 'Lane 1',
        };

        await addScheduleOnClient(result.documentId, newClientSchedule);

        const updatedClient = await getClientById(result._id);

        const response = await supertest(app)
            .get('/clients/schedule')
            .query({
                date: updatedClient.clientSchedule[0].date,
                startHour: 16,
            });
        
        expect(response.status).toBe(200);
        expect(response.body).toHaveLength(1);
    });
});