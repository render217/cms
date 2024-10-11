import { Router } from "express";
import * as articleController from "../controller/article";
import checkAuth from "../middleware/check-auth";
const articleRouter = Router();

articleRouter.use(checkAuth);
articleRouter.get("/", articleController.getArticles);
articleRouter.post("/", articleController.createArticle);
articleRouter.get("/:id", articleController.getSingleArticle);
articleRouter.patch("/:id", articleController.updateArticle);
articleRouter.delete("/:id", articleController.deleteArticle);

export default articleRouter;
