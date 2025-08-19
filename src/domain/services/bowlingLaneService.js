const { 
    createBowlingLane,
    updateLaneById,
    deleteLaneById,
 } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryWrite.js");
const { AppError, NotFoundError } = require("../erros/customErros.js");
const { 
    getAllLanes,
    getLaneByName,
    getLanesBySchedule,
    getLaneById,
 } = require("../../infrastructure/repositories/bowlingLaneRepositories/bowlingLaneRepositoryRead.js");
 const { normalizeDate, integerToStringHour } = require("../../domain/utils/dates.js");
const { getAllClients } = require("../../infrastructure/repositories/clientRepositories/clientRepositoryRead.js");

async function createBowlingLaneService(name) {
    try {
        const laneSchedule = [];
        return await createBowlingLane(name, laneSchedule);
    } catch (error) {
        throw new AppError('Failed to create bowling lane', error);
    }
}

async function getAllLanesService() {
    try {
        return await getAllLanes();
    } catch (error) {
        throw new AppError('Failed to get all lanes', error);
    }
}

async function getLaneByNameService(name) {
    try {
        const result = await getLaneByName(name);        
        return result;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new AppError('Failed to get lane by name');
    }
}

async function getLanesByScheduleService({date, startHour}) {
    try {
    const normalizedDate = normalizeDate(date);

    const normalizedStartHour = integerToStringHour(startHour);

    const endHour = integerToStringHour(startHour + 2);

    return await getLanesBySchedule({date: normalizedDate, startHour: normalizedStartHour, endHour});
    } catch (error) {
        throw new AppError('Failed to get lanes by schedule', error);
    }
}

async function getLaneByIdService(id) {
    try {
        const lane = await getLaneById(id);
        return lane;
    } catch (error) {
        if (error instanceof NotFoundError) {
            throw error;
        }
        throw new AppError('Failed to get lane by ID', error);
    }
}

async function updateLaneByIdService(id, updateLane) {
    try {
        return await updateLaneById(id, updateLane);
    } catch (error) {
        throw new AppError('Failed to update lane by ID', error);
    }
}

async function deleteLaneByIdService(id) {
    try {
        const lane = await getLaneById(id);

        if (lane.laneSchedule.length > 0) {
            throw new AppError('Cannot delete lane with existing schedules');
        }
        return await deleteLaneById(id);
    } catch (error) {
        throw new AppError('Failed to delete lane by ID', error);
    }
}

async function getDashboardInfoService() {
    try {
        const lanes = await getAllLanes();
        const totalLanes = lanes.length;

        const now = new Date();
        let currentHour = now.getHours();

        if (currentHour % 2 !== 0) {
            currentHour = currentHour - 1;
        }

        let totalTodaySchedules = 0;

        for (const lane of lanes) {
            if (
                lane.laneSchedule.length > 0 &&
                lane.laneSchedule[0].date &&
                lane.laneSchedule[0].startHour &&
                lane.laneSchedule[0].endHour &&
                now.getDate() === new Date(lane.laneSchedule[0].date).getDate()
            ) {
                const startHour = parseInt(lane.laneSchedule[0].startHour.split(':')[0]);
                const endHour = parseInt(lane.laneSchedule[0].endHour.split(':')[0]);

                if (!isNaN(startHour) && !isNaN(endHour) && currentHour >= startHour && currentHour < endHour) {
                    lane.isAvailable = false;
                }
            }

            const todaySchedules = lane.laneSchedule.filter(schedule => {
                const scheduleDate = new Date(schedule.date);
                return scheduleDate.getDate() === now.getDate();
            });
            totalTodaySchedules += todaySchedules.length;
        }

        const totalLanesInUseNow = lanes.filter(lane => !lane.isAvailable).length;

        const occupationRateNumber = (totalTodaySchedules / (totalLanes * 4)) * 100;
        const occupationRate = occupationRateNumber.toFixed(2) + '%';

        const registersClients = await getAllClients();
        const totalClients = registersClients.length;
        const totalClientsThisWeek = registersClients.filter(client => {
            const clientDate = new Date(client.createdAt);
            return clientDate.getDate() === now.getDate();
        }).length;

        return { occupationRate, totalClients, totalClientsThisWeek, totalLanes, totalLanesInUseNow, totalTodaySchedules };
    } catch (error) {
        throw new AppError('Failed to get dashboard info', error);
    }
}

module.exports = {
    createBowlingLaneService,
    getAllLanesService,
    getLaneByNameService,
    getLanesByScheduleService,
    updateLaneByIdService,
    deleteLaneByIdService,
    getLaneByIdService,
    getDashboardInfoService,
}