import express from "express";
import {
    addBusToRoute,
    AddStudentToRoute,
    createBusRoute,
    deleteBusFromRoute,
    deleteBusRoute,
    deleteStudentFromRoute,
    editStudentInRoute,
    getAllStudentByBusNumber,
    getAllStudentByRouteId,
    getBusRoute,
    getBusRouteById,
    updateBusRoute,
} from "../Controller/busRoute.Controller.js";

const router = express.Router();

router.post("/createbusroute", createBusRoute);
router.get("/getbusroute", getBusRoute);
router.get("/getbusroute-byid/:id", getBusRouteById);
router.put("/updatebusroute/:id", updateBusRoute);
router.delete("/deletebusroute/:id", deleteBusRoute);
router.post("/addbustoroute/:id", addBusToRoute);
router.delete("/delete-bus-from-route/:id", deleteBusFromRoute);
router.post("/addstudenttoroute", AddStudentToRoute);
router.put("/updatestudenttoroute", editStudentInRoute);
router.delete("/delete-student-from-route", deleteStudentFromRoute);
router.post("/get-student-by-busnumber", getAllStudentByBusNumber);
router.get("/get-allstudent-by-routeid/:id", getAllStudentByRouteId);

export { router as busRouteRoute };
