import mongoose from "mongoose";

const busRouteSchema = new mongoose.Schema({
    routeName: {
        type: String,
    },
    routeFare: {
        type: Number,
    },
    routeLengthOneSide: {
        type: Number,
    },

    buses: [
        {
            busNumber: {
                type: String,
            },
            roundNumber: {
                type: Number,
            },
        },
    ],

    student: [
        {
            studentId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student",
            },
            busNumber: {
                type: String,
            },
            roundNumber: {
                type: Number,
            },
        },
    ],
});

export const BusRoute = mongoose.model("BusRoute", busRouteSchema);
