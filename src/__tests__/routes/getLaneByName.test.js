const supertest = require('supertest');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const app = require('../../server.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('GET /bowling-lanes/:name', () => {
    it('should return status code 200 when get correctly a lane by name', async () => {
        const lane = {
            name: 'Lane 1',
        };

        await supertest(app)
            .post('/bowling-lanes')
            .send(lane)
            .expect(201);

        const response = await supertest(app)
            .get(`/bowling-lanes/${lane.name}`)
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

    it('should return 404 if lane doesnt exist', async () => {

        const response = await supertest(app)
            .get(`/bowling-lanes/any_name`)
            .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toBe('Lane not found');
    })
})