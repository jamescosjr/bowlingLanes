const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');
const { createBowlingLaneService } = require('../../../domain/services/bowlingLaneService.js');
const { createClientService } = require('../../../domain/services/clientService.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /schedules', () => {
    it('should return all schedules', async () => {
        const response = await supertest(app).get('/schedules');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    });

    it ('should return all schedules', async () => {
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

        const allSchedulesResponse = await supertest(app).get('/schedules');

        expect(allSchedulesResponse.status).toBe(200);
        expect(allSchedulesResponse.body).toHaveLength(1);
        expect(allSchedulesResponse.body[0]).toMatchObject({
            date: newSchedule.date.toISOString(),
            startHour: '16:00',
            bowlingLaneName: expect.any(String),
            clientName: expect.any(String),
        });    
    });
    it('should filter schedules by date and startHour', async () => {
        const laneName = 'Lane 1';
        const newLane = await createBowlingLaneService(laneName);
    
        const clientName = 'Jane Doe';
        const clientDocumentId = '987654321';
        const clientAge = 25;
        const newClient = await createClientService(clientName, clientDocumentId, clientAge);
    
        const newSchedule = {
            date: new Date(2023, 10, 1),
            startHour: 16,
            bowlingLaneId: newLane._id,
            clientId: newClient._id,
        };
    
        await supertest(app).post('/schedules').send(newSchedule);
    
        const filteredResponse = await supertest(app)
            .get('/schedules')
            .query({ date: newSchedule.date.toISOString(), startHour: '16:00' });
    
        expect(filteredResponse.status).toBe(200);
        expect(filteredResponse.body).toHaveLength(1);
        expect(filteredResponse.body[0]).toMatchObject({
            date: newSchedule.date.toISOString(),
            startHour: '16:00',
            bowlingLaneName: expect.any(String),
            clientName: expect.any(String),
        });
    });
});