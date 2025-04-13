const { 
    createBowlingLaneService,
    getAllLanesService, 
    getLaneByNameService,
    getLanesByScheduleService,
} = require('../../domain/services/bowlingLaneService.js');
const { addScheduleOnLane } = require('../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js');
const { normalizeDate } = require('../../domain/utils/dates.js')
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

describe('Bowling Lane Service', () => {
    describe('createBowlingLaneService', () => {
        it('should call createBowlingLane with the correct parameters', async () => {
            const name = 'Lane 1';
    
            const result = await createBowlingLaneService(name);
    
            expect(result).toMatchObject({ 
                name: 'Lane 1',
                laneSchedule: [],
                id: expect.any(String),
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    
        it('should throw an error if creation fails', async () => {
            const name = '';
    
            await expect(createBowlingLaneService(name)).rejects.toThrowError(AppError);
       });
    });
    
    describe('getAllLanesService', () => {
        it('should return all lanes', async () => {
            await createBowlingLaneService('Lane 1');
            await createBowlingLaneService('Lane 2');
    
            const result = await getAllLanesService();
    
            expect(result).toHaveLength(2);
            expect(result).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({
                        name: 'Lane 1',
                        laneSchedule: [],
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    }),
                    expect.objectContaining({
                        name: 'Lane 2',
                        laneSchedule: [],
                        createdAt: expect.any(Date),
                        updatedAt: expect.any(Date),
                    }),
                ]),
            );
        });
    
        it('should return an empty array if there are no lanes', async () => {
    
            const result = await getAllLanesService();
    
            expect(result).toHaveLength(0);
        });
    });

    describe('getLaneByNameService', () => {
        it('should return the lane with the specified name', async () => {
            await createBowlingLaneService('Lane 1');
    
            const result = await getLaneByNameService('Lane 1');
    
            expect(result).toMatchObject({
                name: 'Lane 1',
                laneSchedule: [],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        });
    
        it('should throw an error if the lane is not found', async () => {
            await createBowlingLaneService('Lane 1');
    
            await expect(getLaneByNameService('Nonexistent Lane')).rejects.toThrowError(AppError);
        });
    });

    describe('getLanesByScheduleService', () => {
        it('should return lanes with the specified schedule', async () => {
            await createBowlingLaneService('Lane 1');
            await createBowlingLaneService('Lane 2');

            const currentDate = normalizeDate(new Date());

            await addScheduleOnLane('Lane 1', {
                date: currentDate,
                startHour: '10:00',
                endHour: '12:00',
            });
            await addScheduleOnLane('Lane 2', {
                date: currentDate,
                startHour: '10:00',
                endHour: '12:00',
            });

            const lane1 = await getLaneByNameService('Lane 1');
            const lane2 = await getLaneByNameService('Lane 2');
            expect(lane1.laneSchedule).toHaveLength(1);
            expect(lane2.laneSchedule).toHaveLength(1);

                const integerHour = 10;

            const result = await getLanesByScheduleService({date: currentDate, startHour: integerHour});

            expect(result).toHaveLength(2);
            expect(result[0]).toMatchObject({
                name: 'Lane 1',
                laneSchedule: [{
                    date: expect.any(Date),
                    startHour: '10:00',
                    endHour: '12:00',
                }],
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            });
        }
        );
        it('should return an empty array if no lanes match the schedule', async () => {
            await createBowlingLaneService('Lane 1');
            await createBowlingLaneService('Lane 2');

            const currentDate = normalizeDate(new Date());
            
            const integerHour = 18;
            
            const result = await getLanesByScheduleService({date: currentDate, startHour: integerHour});

            expect(result).toHaveLength(0);
        });
    })
});

