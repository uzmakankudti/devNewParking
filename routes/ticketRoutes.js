import expres from "express";
import { checkInVehicle, checkOutVehicle } from "../controllers/ticketController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const ticketrouter = expres.Router();

ticketrouter.route("/checkInVehicle", authMiddleware).post(checkInVehicle);
ticketrouter.route("/checkOutVehicle", authMiddleware).post(checkOutVehicle);

export default ticketrouter;

