import { Router } from "express";
import * as permissionController from "../controller/permission";
import checkAuth from "../middleware/check-auth";
const permissionRouter = Router();

permissionRouter.use(checkAuth);
permissionRouter.get("/", permissionController.getPermissions);
permissionRouter.get("/user/:userId", permissionController.getUserPermissions);
permissionRouter.post(
    "/user/:userId/assign",
    permissionController.assignPermission
);
permissionRouter.post(
    "/user/:userId/revoke",
    permissionController.revokePermission
);

export default permissionRouter;
