import expressRouter from "express";
import userRouter from "./userRoutes.js";
import parkingLocationRouter from "./parkingLocationRoutes.js";
import parkingSlotRouter from "./parkingSlotRoutes.js";
import ticketrouter from "./ticketRoutes.js";
import reportRouter from "./reportRoutes.js";

const router = expressRouter();

router.use("/user",userRouter);
router.use("/parking",parkingLocationRouter);
router.use("/slot",parkingSlotRouter);
router.use("/ticket",ticketrouter);
router.use("/report",reportRouter);

export default router;