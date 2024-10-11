import { Router } from "express";
import * as documentController from "../controller/document";
import checkAuth from "../middleware/check-auth";
const documentRouter = Router();

documentRouter.use(checkAuth);

documentRouter.get("/", documentController.getDocuments);
documentRouter.post("/", documentController.createDocument);
documentRouter.get("/:id", documentController.getSingleDocument);
documentRouter.patch("/:id", documentController.updateDocument);
documentRouter.delete("/:id", documentController.deleteDocument);

export default documentRouter;
