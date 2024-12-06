import mongoose from "mongoose";

const registerBusSchema = new mongoose.Schema({
    busNo: {
        type: String,
    },
    kmReading: {
        type: Number,
    },
    serviceOnKm: {
        type: Number,
    },
    insuranceExpiry: {
        type: Date,
    },
    milageApprox: {
        type: String,
    },
    polluationExpiry: {
        type: Date,
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Staff",
    },
    busDocument: [
        {
            rcImage: {
                type: String,
            },
            polluationImage: {
                type: String,
            },
            insuranceImage: {
                type: String,
            },
        },
    ],
});

export const RegisterBus = mongoose.model("RegisterBus", registerBusSchema);
