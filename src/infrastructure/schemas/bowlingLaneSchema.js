import mongoose from 'mongoose';

const collectionName = 'bowlingLanes';

export const bowlingLaneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    laneSchedule: {
        type: [
            {
                day: {
                    type: String,
                    required: true,
                },
                startHour: {
                    type: String,
                    required: true,
                },
                endHour: {
                    type: String,
                    required: true,
                },
            },
        ],
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: true,
    },
});

export const BowlingLane = mongoose.model(collectionName, bowlingLaneSchema);