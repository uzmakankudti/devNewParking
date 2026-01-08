import express from "express";
import { dailyReport, dateWiseReport, monthlyReport } from "../controllers/reportController.js";
import { authenticateJWT, authorizeRoles } from "../middlewares/authMiddleware.js";

const reportRouter = express.Router();

reportRouter.route("/dailyReport").get(authenticateJWT, authorizeRoles("PARKING_ADMIN", "SUPER_ADMIN"), dailyReport);
reportRouter.route("/dateWiseReport").get(authenticateJWT, authorizeRoles("PARKING_ADMIN", "SUPER_ADMIN"), dateWiseReport);
reportRouter.route("/monthlyReport").get(authenticateJWT, authorizeRoles("PARKING_ADMIN", "SUPER_ADMIN"), monthlyReport);
export default reportRouter;
