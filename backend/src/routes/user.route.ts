import { Router } from "express";
import * as userController from "../controller/user";
const userRouter = Router();

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/:id", userController.getSingleUser);
userRouter.patch("/:id", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id/update-status", userController.updateUserStatus);

export default userRouter;
