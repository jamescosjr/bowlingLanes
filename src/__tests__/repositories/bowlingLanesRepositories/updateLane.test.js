const { AppError } = require('../../../domain/erros/customErros.js');
const {
    createBowlingLane, 
    addScheduleOnLane,
    removeScheduleOnLane,
    updateLaneById,
} = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');
const { getLaneByName } = require('../../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js')
const  { connect, closeDatabase, clearDatabase } = require('../../../../jest/jest.setup');
const { ObjectId } = require('mongodb');

beforeAll(async () => {
    await connect();
});

afterEach(async () => {
    await clearDatabase();
});

afterAll(async () => {
    await closeDatabase();
});

describe('updates', () => {
    describe('addScheduleOnLane', () => {
        it('should update a bowling lane with the given name and schedule', async () => {
            const name = 'Lane 1';
    
            await createBowlingLane(name);
    
            const updatedLaneSchedule1 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00'
                }
    
                const updatedLaneSchedule2 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '12:00',
                    endHour: '14:00'
                }
    
    
            await addScheduleOnLane(name, updatedLaneSchedule1);
    
            await addScheduleOnLane(name, updatedLaneSchedule2);
    
            const bowlingLane = await getLaneByName(name);
        
            expect(bowlingLane).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'Lane 1',
                laneSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    },
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '12:00',
                        endHour: '14:00'   
                    }
                ],
            })
        });
    
        it('should throw an error if the lane does not exist', async () => {
            const name = 'Non-existent Lane';
            const updatedLaneSchedule = [
                {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00'
                },
            ];
    
            await expect(addScheduleOnLane(name, updatedLaneSchedule)).rejects.toThrow(AppError);
        });
    
    
    });

    describe('removeScheduleOnLane', () => {
        it('should update a bowling lane with the given name and schedule', async () => {
            const name = 'Lane 1';
    
            await createBowlingLane(name);
    
            const updatedLaneSchedule1 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00',
                    client: '123456',
                }
    
                const updatedLaneSchedule2 =
                {
                    date: new Date(2025, 7, 12),
                    startHour: '12:00',
                    endHour: '14:00'
                }
    
    
            await addScheduleOnLane(name, updatedLaneSchedule1);
    
            await addScheduleOnLane(name, updatedLaneSchedule2);
    
            const bowlingLane = await getLaneByName(name);
        
            expect(bowlingLane).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'Lane 1',
                laneSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '10:00',
                        endHour: '12:00'
                    },
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '12:00',
                        endHour: '14:00'   
                    }
                ],
            });

            await removeScheduleOnLane(name, updatedLaneSchedule1);

            const updatedBowlingLane = await getLaneByName('Lane 1')
    
            expect(updatedBowlingLane).toMatchObject({
                _id: expect.any(ObjectId),
                name: 'Lane 1',
                laneSchedule: [
                    {
                        date: new Date(2025, 7, 12),
                        startHour: '12:00',
                        endHour: '14:00'
                    }
                ],
            });
        });
    
        it('should throw an error if the lane does not exist', async () => {
            const name = 'Non-existent Lane';
            const updatedLaneSchedule = [
                {
                    date: new Date(2025, 7, 12),
                    startHour: '10:00',
                    endHour: '12:00'
                },
            ];
    
            await expect(addScheduleOnLane(name, updatedLaneSchedule)).rejects.toThrow(AppError);
        });
    });
})

