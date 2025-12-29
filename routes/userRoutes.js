import express from "express";
import { createUser, deleteUser, editUser, getAll, loginUser, searchUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/create").post(createUser);
userRouter.route("/getAllUsers").get(getAll);
userRouter.route("/login").post(loginUser);
userRouter.route("/editUser/:userId").post(editUser);
userRouter.route("/deleteUser/:userId").delete(deleteUser);
userRouter.route("/searchUser").get(searchUser);

export default userRouter;

