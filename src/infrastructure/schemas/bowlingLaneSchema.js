const mongoose = require('mongoose');

const collectionName = 'bowlingLanes';

const laneScheduleSchema = new mongoose.Schema({
    _id: false,
    date: { type: Date, required: true },
    startHour: { type: String, required: true },
    endHour: { type: String, required: true },
    client: { type: String, required: true }
});

const bowlingLaneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    laneSchedule: {
        type: [laneScheduleSchema],
        default: []
    }

}, { timestamps: true });

const BowlingLane = mongoose.model(collectionName, bowlingLaneSchema);

module.exports = BowlingLane;