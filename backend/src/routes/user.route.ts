import { Router } from "express";
import * as userController from "../controller/user";
import checkAuth from "../middleware/check-auth";

const userRouter = Router();

userRouter.use(checkAuth);

userRouter.get("/", userController.getUsers);
userRouter.post("/", userController.createUser);
userRouter.get("/me", userController.getMe);
userRouter.get("/:id", userController.getSingleUser);
userRouter.patch("/", userController.updateUser);
userRouter.delete("/:id", userController.deleteUser);
userRouter.patch("/:id/update-status", userController.updateUserStatus);

export default userRouter;
