import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createParkingSlot, deleteParkingSlot, getAllParkingSlots, getParkingSlotById, updateParkingSlot } from "../controllers/parkingSlotController.js";

const parkingSlotRouter = express.Router();

parkingSlotRouter.route("/create", authMiddleware).post(createParkingSlot);
parkingSlotRouter.route("/getAll").get(getAllParkingSlots);
parkingSlotRouter.route("/getById/:id").get(getParkingSlotById);
parkingSlotRouter.route("/update/:id").put(updateParkingSlot);
parkingSlotRouter.route("/delete/:id").delete(deleteParkingSlot);

export default parkingSlotRouter;
