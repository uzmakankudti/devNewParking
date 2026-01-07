import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { dailyReport } from "../controllers/reportController.js";

const reportRouter = express.Router();

reportRouter.route("/dailyReport").get(dailyReport, authMiddleware);

export default router;
