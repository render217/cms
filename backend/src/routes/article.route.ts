import { Router } from "express";
import * as articleController from "../controller/article";
const articleRouter = Router();

articleRouter.get("/", articleController.getArticles);
articleRouter.post("/", articleController.createArticle);
articleRouter.get("/:id", articleController.getSingleArticle);
articleRouter.patch("/:id", articleController.updateArticle);
articleRouter.delete("/:id", articleController.deleteArticle);

export default articleRouter;
