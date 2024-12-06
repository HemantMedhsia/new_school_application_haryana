import wrapAsync from "../Utils/wrapAsync.js";
import { ApiResponse } from "../Utils/responseHandler.js";
import { ApiError } from "../Utils/errorHandler.js";
import { BusRoute } from "../Models/busRoute.Model.js";

export const createBusRoute = wrapAsync(async (req, res, next) => {
    const { routeName, routeFare, routeLengthOneSide } = req.body;

    const newBusRoute = new BusRoute({
        routeName,
        routeFare,
        routeLengthOneSide,
    });

    await newBusRoute.save();

    res.status(201).json(
        new ApiResponse(201, newBusRoute, "Bus Route created successfully")
    );
});

export const getBusRoute = wrapAsync(async (req, res, next) => {
    const busRoute = await BusRoute.find({});

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    res.status(200).json(new ApiResponse(200, busRoute, "Bus Route found"));
});

export const getBusRouteById = wrapAsync(async (req, res, next) => {
    const busRoute = await BusRoute.findById(req.params.id);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    res.status(200).json(new ApiResponse(200, busRoute, "Bus Route found"));
});

export const updateBusRoute = wrapAsync(async (req, res, next) => {
    const { routeName, routeFare, routeLengthOneSide } = req.body;

    const busRoute = await BusRoute.findByIdAndUpdate(
        req.params.id,
        {
            routeName,
            routeFare,
            routeLengthOneSide,
        },
        { new: true }
    );

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    res.status(200).json(
        new ApiResponse(200, busRoute, "Bus Route updated successfully")
    );
});

export const deleteBusRoute = wrapAsync(async (req, res, next) => {
    const busRoute = await BusRoute.findByIdAndDelete(req.params.id);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    res.status(200).json(
        new ApiResponse(200, busRoute, "Bus Route deleted successfully")
    );
});

export const addBusToRoute = wrapAsync(async (req, res, next) => {
    const { busNumber, roundNumber } = req.body;

    const busRoute = await BusRoute.findById(req.params.id);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    busRoute.buses.push({ busNumber, roundNumber });

    await busRoute.save();

    res.status(200).json(
        new ApiResponse(200, busRoute, "Bus added to Route successfully")
    );
});

export const deleteBusFromRoute = wrapAsync(async (req, res, next) => {
    const { busNumber, roundNumber } = req.body;

    const busRoute = await BusRoute.findById(req.params.id);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    const busIndex = busRoute.buses.findIndex(
        (bus) => bus.busNumber === busNumber && bus.roundNumber === roundNumber
    );

    if (busIndex === -1) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Bus not found in Route"));
    }
    busRoute.buses.splice(busIndex, 1);

    await busRoute.save();

    res.status(200).json(
        new ApiResponse(200, busRoute, "Bus removed from Route successfully")
    );
});

export const AddStudentToRoute = wrapAsync(async (req, res, next) => {
    const { studentId, busRouteId, busNumber, roundNumber } = req.body;
    const busRoute = await BusRoute.findById(busRouteId);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    const studentExist = busRoute.student.find(
        (entry) => entry.studentId.toString() === studentId.toString()
    );

    if (studentExist) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Student already added to Route"));
    }
    busRoute.student.push({ studentId, busNumber, roundNumber });
    let busRouteadd = await busRoute.save();

    res.status(200).json(
        new ApiResponse(200, busRouteadd, "Student added to Route successfully")
    );
});

export const editStudentInRoute = wrapAsync(async (req, res, next) => {
    const { studentId, busRouteId, busNumber, roundNumber } = req.body;
    const busRoute = await BusRoute.findById(busRouteId);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    const studentExist = busRoute.student.find(
        (entry) => entry.studentId.toString() === studentId.toString()
    );

    if (!studentExist) {
        return res
            .status(400)
            .json(new ApiResponse(400, null, "Student not found in Route"));
    }

    studentExist.busNumber = busNumber;
    studentExist.roundNumber = roundNumber;

    await busRoute.save();

    res.status(200).json(
        new ApiResponse(200, busRoute, "Student updated in Route successfully")
    );
});

export const deleteStudentFromRoute = wrapAsync(async (req, res, next) => {
    const { studentId, busRouteId } = req.body;
    const busRoute = await BusRoute.findById(busRouteId);

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    const studentIndex = busRoute.student.findIndex(
        (entry) => entry.studentId.toString() === studentId.toString()
    );

    if (studentIndex === -1) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "Student not found in Route"));
    }

    busRoute.student.splice(studentIndex, 1);

    await busRoute.save();

    res.status(200).json(
        new ApiResponse(
            200,
            busRoute,
            "Student removed from Route successfully"
        )
    );
});

export const getAllStudentByBusNumber = wrapAsync(async (req, res, next) => {
    const { busNumber } = req.body;

    // Find bus routes with students based on the bus number
    const busRoutes = await BusRoute.find({
        "student.busNumber": busNumber,
    }).populate({
        path: "student.studentId",
        populate: {
            path: "currentClass",
            select: "name",
        },
        select: "firstName mobileNumber currentClass admissionNo lastName",
    });


    console.log(busRoutes);

    if (!busRoutes || busRoutes.length === 0) {
        return res
            .status(404)
            .json(
                new ApiResponse(
                    404,
                    null,
                    "No students found for this Bus Number"
                )
            );
    }

    const students = busRoutes.flatMap((route) =>
        route.student
            .filter((student) => student.busNumber === busNumber)
            .map((student) => ({
                studentId: student.studentId?._id,
                name:
                    student.studentId?.firstName +
                    " " +
                    student.studentId?.lastName,
                class: student.studentId?.currentClass?.name,
                mobileNumber: student.studentId?.mobileNumber,
                admissionNumber: student.studentId?.admissionNo,
                busNumber: student.busNumber,
                roundNumber: student.roundNumber,
            }))
    );

    const responseData = {
        busNumber, // Include the bus number in the response
        students, // Include formatted students array
    };

    res.status(200).json(
        new ApiResponse(200, responseData, "Students found for the Bus Number")
    );
});

export const getAllStudentByRouteId = wrapAsync(async (req, res, next) => {
    const busRoute = await BusRoute.findById(req.params.id).populate({
        path: "student.studentId",
        populate: {
            path: "currentClass",
            select: "name",
        },
        select: "firstName mobileNumber currentClass admissionNo lastName",
    });

    if (!busRoute) {
        return res
            .status(404)
            .json(new ApiResponse(404, null, "No Bus Route found"));
    }

    const students = busRoute.student.map((student) => ({
        studentId: student.studentId?._id,
        name: student.studentId?.firstName + " " + student.studentId?.lastName,
        class: student.studentId?.currentClass?.name,
        mobileNumber: student.studentId?.mobileNumber,
        admissionNumber: student.studentId?.admissionNo,
        busNumber: student.busNumber,
        roundNumber: student.roundNumber,
    }));

    const responseData = {
        routeName: busRoute.routeName, // Include routeName from BusRoute
        students, // Include formatted students array
    };

    res.status(200).json(
        new ApiResponse(200, responseData, "Student found in Route")
    );
});
