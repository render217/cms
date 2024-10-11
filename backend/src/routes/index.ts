import { Router } from "express";
import userRouter from "./user.route";
import projectRouter from "./project.route";
import documentRouter from "./document.route";
import articleRouter from "./article.route";
import authRouter from "./auth.route";
import permissionRouter from "./permission.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/permissions", permissionRouter);
router.use("/projects", projectRouter);
router.use("/documents", documentRouter);
router.use("/articles", articleRouter);

export default router;
