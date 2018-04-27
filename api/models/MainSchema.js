const mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const MainSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: { type: String },
    shortName: { type: String },
    nickName: { type: String },
    firstName: { type: String },
    middleName: { type: String },
    lastName: { type: String },
    moderator: { type: Array },
    group: { type: Array },
    caption: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    series: { type: ObjectId },
    owner: { type: String },
    coach: { type: String },
    captain: { type: String },
    home: { type: ObjectId },
    teamA: { type: ObjectId },
    teamB: { type: ObjectId },
    on: { type: Date },
    venue: { type: ObjectId },
    status: { type: Number },
    result: { type: ObjectId },
    startDate: { type: Date },
    endDate: { type: Date },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("main", MainSchema);