import expressRouter from "express";
import userRouter from "./userRoutes.js";
import parkingLocationRouter from "./parkingLocationRoutes.js";
import parkingSlotRouter from "./parkingSlotRoutes.js";
import ticketrouter from "./ticketRoutes.js";

const router = expressRouter();

router.use("/user",userRouter);
router.use("/parking",parkingLocationRouter);
router.use("/slot",parkingSlotRouter);
router.use("/ticket",ticketrouter);

export default router;