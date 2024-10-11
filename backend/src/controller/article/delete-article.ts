import type { Request, Response } from "express";
const deleteArticle = async (req: Request, res: Response) => {
    res.send("deleteArticle");
};
export default deleteArticle;
