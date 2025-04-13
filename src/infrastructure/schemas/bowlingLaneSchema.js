const mongoose = require('mongoose');

const collectionName = 'bowlingLanes';

const bowlingLaneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    laneSchedule: {
        type: [
            {
                _id: false,
                date: {
                    type: Date,
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
        default: [],
    },
}, { timestamps: true });

const BowlingLane = mongoose.model(collectionName, bowlingLaneSchema);

module.exports = BowlingLane;