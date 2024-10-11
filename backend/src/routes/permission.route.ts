import { Router } from "express";
import * as permissionController from "../controller/permission";
const permissionRouter = Router();

permissionRouter.get("/:userId", permissionController.getUserPermissions);

permissionRouter.post("/:userId/assign", permissionController.assignPermission);
permissionRouter.post("/:userId/revoke", permissionController.revokePermission);

export default permissionRouter;
