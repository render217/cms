import { Router } from "express";
import * as projectController from "../controller/project";
import checkAuth from "../middleware/check-auth";
const projectRouter = Router();

projectRouter.use(checkAuth);
projectRouter.get("/", projectController.getProjects);
projectRouter.post("/", projectController.createProject);
projectRouter.get("/:id", projectController.getSingleProject);
projectRouter.patch("/:id", projectController.updateProject);
projectRouter.delete("/:id", projectController.deleteProject);

export default projectRouter;
