import { Router } from "express";
import * as documentController from "../controller/document";
const documentRouter = Router();

documentRouter.get("/", documentController.getDocuments);
documentRouter.post("/", documentController.createDocument);
documentRouter.get("/:id", documentController.getSingleDocument);
documentRouter.patch("/:id", documentController.updateDocument);
documentRouter.delete("/:id", documentController.deleteDocument);

export default documentRouter;
