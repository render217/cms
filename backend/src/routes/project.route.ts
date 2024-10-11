import { Router } from "express";
import * as projectController from "../controller/project";
const projectRouter = Router();

projectRouter.get("/", projectController.getProjects);
projectRouter.post("/", projectController.createProject);
projectRouter.get("/:id", projectController.getSingleProject);
projectRouter.patch("/:id", projectController.updateProject);
projectRouter.delete("/:id", projectController.deleteProject);

export default projectRouter;
