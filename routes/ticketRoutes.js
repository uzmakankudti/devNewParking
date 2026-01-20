import expres from "express";
import { checkInVehicle, checkOutVehicle, paymentTypeCount } from "../controllers/ticketController.js";
import  { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const ticketrouter = expres.Router();

ticketrouter.route("/checkInVehicle").post(checkInVehicle, authenticateJWT, authorizeRoles("ATTENDANT"),);
ticketrouter.route("/checkOutVehicle").post(checkOutVehicle, authenticateJWT, authorizeRoles("ATTENDANT"),);
ticketrouter.route("/paymentTypeCount").get(paymentTypeCount);

export default ticketrouter;

