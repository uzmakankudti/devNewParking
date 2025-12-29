import expressRouter from "express";
import userRouter from "./userRoutes.js";
import parkingLocationRouter from "./parkingLocationRoutes.js";

const router = expressRouter();

router.use("/user",userRouter);
router.use("/parking",parkingLocationRouter);

export default router;