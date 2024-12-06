import { RegisterBus } from "../Models/registerBus.Model.js";
import wrapAsync from "../Utils/wrapAsync.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import { ApiError } from "../Utils/errorHandler.js";
import { Staff } from "../Models/staff.Model.js";

export const registerBus = wrapAsync(async (req, res) => {
    const {
        busNo,
        kmReading,
        serviceOnKm,
        insuranceExpiry,
        milageApprox,
        polluationExpiry,
        driverId,
    } = req.body;

    const bus = new RegisterBus({
        busNo,
        kmReading,
        serviceOnKm,
        insuranceExpiry,
        milageApprox,
        polluationExpiry,
        driverId,
    });

    await bus.save();

    return res
        .status(201)
        .json(new ApiResponse(201, bus, "Bus Registered Successfully"));
});

export const updateKmReading = wrapAsync(async (req, res) => {
    const { busId, kmReading } = req.body;

    const bus = await RegisterBus.findById(busId);

    if (!bus) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Bus not found"));
    }

    bus.kmReading = kmReading;

    await bus.save();

    return res
        .status(200)
        .json(new ApiResponse(200, bus, "Km Reading Updated Successfully"));
});

export const updateBusKeyDetails = wrapAsync(async (req, res) => {
    const { busId, busNo, insuranceExpiry, polluationExpiry } = req.body;

    if (!busNo || !insuranceExpiry || !polluationExpiry) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "All fields are required"));
    }

    const bus = await RegisterBus.findByIdAndUpdate(
        busId,
        {
            busNo,
            insuranceExpiry,
            polluationExpiry,
        },
        { new: true, runValidators: true }
    );

    if (!bus) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Bus not found"));
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, bus, "Bus Key Details Updated Successfully")
        );
});

export const uploadBusDocument = wrapAsync(async (req, res) => {
    const { busId, documentType } = req.body;

    const bus = await RegisterBus.findById(busId);
    if (!bus) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Bus not found"));
    }

    if (!req.file) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "No image uploaded"));
    }

    const uploadedImageUrl = req.file.path;

    if (
        !documentType ||
        !["rcImage", "polluationImage", "insuranceImage"].includes(documentType)
    ) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Invalid document type"));
    }

    if (!bus.busDocument) {
        bus.busDocument = [];
    }

    let documentEntry = bus.busDocument[0] || {};

    documentEntry[documentType] = uploadedImageUrl;

    if (bus.busDocument.length === 0) {
        bus.busDocument.push(documentEntry);
    }

    await bus.save();

    res.status(200).json(
        new ApiResponse(
            200,
            { bus },
            `Image uploaded successfully for ${documentType}`
        )
    );
});

export const deleteBus = wrapAsync(async (req, res) => {
    const { busId } = req.body;

    const bus = await RegisterBus.findByIdAndDelete(busId);

    if (!bus) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Bus not found"));
    }

    return res
        .status(200)
        .json(new ApiResponse(200, bus, "Bus Deleted Successfully"));
});

export const getAllBus = wrapAsync(async (req, res) => {
    const bus = await RegisterBus.find().populate("driverId", "name _id");

    if (!bus) {
        return res.status(404).json(new ApiResponse(404, null, "No Bus found"));
    }

    return res.status(200).json(new ApiResponse(200, bus, "Bus found"));
});

export const getBusById = wrapAsync(async (req, res) => {
    const bus = await RegisterBus.findById(req.params.id).populate(
        "driverId",
        "name _id"
    );

    if (!bus) {
        return res.status(404).json(new ApiResponse(404, null, "No Bus found"));
    }

    return res.status(200).json(new ApiResponse(200, bus, "Bus found"));
});
