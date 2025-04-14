const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const {addScheduleOnLane, createBowlingLane} = require('../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');
const { normalizeDate } = require('../../domain/utils/dates.js');
const app = require('../../server.js');
const { getLaneByName } = require('../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('POST /bowling-lanes', () => {
    it('should create a new bowling lane and then get all lanes by schedule', async () => {
        const name = 'Lane 1';
    
        const newLane = await createBowlingLane(name);
    
        const newSchedule = {
            date: new Date(2025, 7, 12),
            startHour: '16:00',
            endHour: '18:00'
        };
    
        await addScheduleOnLane(newLane.name, newSchedule);
    
        const laneUpdated = await getLaneByName(name);
    
        const response = await supertest(app)
            .get('/bowling-lanes/schedule')
            .query({
                date: laneUpdated.laneSchedule[0].date,
                startHour: 16,
            });
    
        expect(response.status).toBe(200);
    
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name: laneUpdated.name,
                    laneSchedule: expect.arrayContaining([
                        expect.objectContaining({
                            date: new Date(laneUpdated.laneSchedule[0].date).toISOString(),
                            startHour: '16:00',
                            endHour: '18:00',
                        })
                    ])
                })
            ])
        );
    });

    it('should throw an error if the date is not provided', async () => {
        const response = await supertest(app)
            .get('/bowling-lanes/schedule')
            .query({
                startHour: 16,
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'The date is not valid',
        });
    });
    it('should throw an error if the startHour is not provided', async () => {
        const response = await supertest(app)
            .get('/bowling-lanes/schedule')
            .query({
                date: normalizeDate(new Date(2025, 7, 12)),
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'The hour should be an even integer between 16 and 22',
        });
    });
    it('should throw an error if the date is not valid', async () => {
        const response = await supertest(app)
            .get('/bowling-lanes/schedule')
            .query({
                date: 'invalid-date',
                startHour: 16,
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'The date is not valid',
        });
    });
    it('should throw an error if the startHour is not valid', async () => {
        const response = await supertest(app)
            .get('/bowling-lanes/schedule')
            .query({
                date: normalizeDate(new Date(2025, 7, 12)),
                startHour: 'invalid-hour',
            });
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'The hour should be an even integer between 16 and 22',
        });
    });
});