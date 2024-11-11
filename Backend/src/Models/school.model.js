import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
        },
    ],
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
        },
    ],
    notices: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Notice",
        },
    ],
    subjects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
        },
    ],
    workingStaffs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Staff",
        },
    ],
    admin: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Admin",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    schoolCode: {
        type: String,
        required: true,
    },
});

// Create the school model
export const School = mongoose.model("School", schoolSchema);
