import express from "express";
import { createParkingLocation, deleteParkingLocation, getAllParkingLocations, getParkingLocationById, updateParkingLocation } from "../controllers/parkingLocationController.js";

const parkingLocationRouter = express.Router();

parkingLocationRouter.route("/create").post(createParkingLocation);
parkingLocationRouter.route("/getAll").get(getAllParkingLocations);
parkingLocationRouter.route("/getById/:id").get(getParkingLocationById); 
parkingLocationRouter.route("/update/:id").put(updateParkingLocation);
parkingLocationRouter.route("/delete/:id").delete(deleteParkingLocation);

export default parkingLocationRouter;