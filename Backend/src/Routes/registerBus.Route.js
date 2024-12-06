import express from "express";
import {
    deleteBus,
    getAllBus,
    getBusById,
    registerBus,
    updateBusKeyDetails,
    updateKmReading,
    uploadBusDocument,
} from "../Controller/registerBus.Controller.js";
import upload from "../Utils/multerConfig.js";

const router = express.Router();

router.post("/registerbus", registerBus);
router.post("/updatekmreading", updateKmReading);
router.post("/updatebuskeydetails", updateBusKeyDetails);
router.delete("/deletebus", deleteBus);
router.get("/getallbus", getAllBus);
router.get("/getbusbyid/:id", getBusById);
router.post("/uploadbusdocument", upload.single("img"), uploadBusDocument);

export { router as registerBusRoute };
