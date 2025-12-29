import express from "express";
import { createUser, getAll } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/create").post(createUser);
userRouter.route("/getAllUsers").get(getAll);

export default userRouter;

