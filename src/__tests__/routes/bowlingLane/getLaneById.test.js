const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup.js');
const app = require('../../../server.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /bowling-lanes/:id', () => {
    it ('should return status code 200 when get correctly a lane by id', async () => {
        const lane = {
            name: 'Lane 1',
        };

        const result = await supertest(app)
            .post('/bowling-lanes')
            .send(lane)
            .expect(201);

        expect(result.status).toBe(201);
        expect(result.body).toEqual(expect.objectContaining({
            name: lane.name,
            laneSchedule: [],
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));

        const response = await supertest(app)
            .get(`/bowling-lanes/${result.body._id}`)
            .expect(200);

        expect(response.body).toEqual(expect.objectContaining({
            name: lane.name,
            laneSchedule: [],
            _id: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            __v: expect.any(Number),
        }));
    });
});