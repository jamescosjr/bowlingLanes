const { 
    createScheduleService,
    getAllSchedulesService,
    deleteScheduleService, 
} = require('../../domain/services/scheduleService.js');
const { createBowlingLaneService, getLaneByIdService } = require('../../domain/services/bowlingLaneService.js');
const { createClientService, getClientByIdService } = require('../../domain/services/clientService.js');
const { connect, closeDatabase, clearDatabase } = require('../../../jest/jest.setup.js');
const { AppError } = require('../../domain/erros/customErros.js');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('scheduleService', () => {
    describe('createScheduleService', () => {
        it ('should create schedule and add the schedules on lane and client', async () => {
            const laneName = 'Lane 1';
            const newLane = await createBowlingLaneService(laneName);
    
            const clientName = 'John Doe';
            const clientDocumentId = '123456789';
            const clientAge = 30;
            const newClient = await createClientService(clientName, clientDocumentId, clientAge);
    
            const clientId = newClient._id;
            const bowlingLaneId = newLane._id;
            const startHour = 16;
            const date = new Date(2023, 10, 1);     
    
            const result = await createScheduleService(date, startHour, bowlingLaneId, clientId);
    
            expect(result._id).toBeDefined();
            expect(result).toMatchObject({
                date: expect.any(Date),
                startHour: expect.any(String),
                endHour: expect.any(String),
                bowlingLaneId: expect.any(String),
                clientId: expect.any(String),
            });
    
            const lane = await getLaneByIdService(bowlingLaneId);
    
            expect(lane).toMatchObject({
                name: laneName,
                laneSchedule: [
                    {
                        date: expect.any(Date),
                        startHour: expect.any(String),
                        endHour: expect.any(String),
                        client: clientName,
                    }
                ]
            });
    
            const client = await getClientByIdService(clientId);
    
            expect(client.toObject()).toMatchObject({
                name: clientName,
                documentId: clientDocumentId,
                age: clientAge,
                clientSchedule: [
                    {
                        date: expect.any(Date),
                        startHour: expect.any(String),
                        endHour: expect.any(String),
                        bowlingLane: laneName,
                    }
                ]
            });
            expect(lane.laneSchedule).toHaveLength(1);
        })
    
        it ('should throw an error if lane not found', async () => {
            const clientName = 'John Doe';
            const clientDocumentId = '123456789';
            const clientAge = 30;
            const newClient = await createClientService(clientName, clientDocumentId, clientAge);
    
            const clientId = newClient._id;
            const bowlingLaneId = 'nonexistent-lane-id';
            const startHour = 16;
            const date = new Date(2023, 10, 1);     
    
            await expect(createScheduleService(date, startHour, bowlingLaneId, clientId)).rejects.toThrow(AppError);
        })
    });

    describe('getAllSchedulesService', () => {
        it ('should return all schedules', async () => {
            const laneName = 'Lane 1';
            const newLane = await createBowlingLaneService(laneName);
    
            const clientName = 'John Doe';
            const clientDocumentId = '123456789';
            const clientAge = 30;
            const newClient = await createClientService(clientName, clientDocumentId, clientAge);
    
            const clientId = newClient._id;
            const bowlingLaneId = newLane._id;
            const startHour = 16;
            const date = new Date(2023, 10, 1);     
    
            await createScheduleService(date, startHour, bowlingLaneId, clientId);
    
            const allSchedules = await getAllSchedulesService({ filter: {}, page: 1, limit: 10 });
    
            expect(allSchedules).toHaveLength(1);
            expect(allSchedules[0]).toMatchObject({
                date: expect.any(Date),
                startHour: expect.any(String),
                endHour: expect.any(String),
                bowlingLaneId: expect.any(String),
                clientId: expect.any(String),
            });
        })
    })
    it ('should return an empty array if there are no schedules', async () => {
        const allSchedules = await getAllSchedulesService({ filter: {}, page:1, limit:10 });
        expect(allSchedules).toHaveLength(0);
    });

    describe('deleteScheduleService', () => {
        it ('should delete a schedule', async () => {
            const laneName = 'Lane 1';
            const newLane = await createBowlingLaneService(laneName);
    
            const clientName = 'John Doe';
            const clientDocumentId = '123456789';
            const clientAge = 30;
            const newClient = await createClientService(clientName, clientDocumentId, clientAge);
    
            const clientId = newClient._id;
            const bowlingLaneId = newLane._id;
            const startHour = 16;
            const date = new Date(2023, 10, 1);     
    
            const schedule = await createScheduleService(date, startHour, bowlingLaneId, clientId);
    
            await deleteScheduleService(schedule._id);
    
            const allSchedules = await getAllSchedulesService({ filter: {}, page: 1, limit: 10 });
    
            expect(allSchedules).toHaveLength(0);
        });
    });
});