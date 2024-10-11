import type { Request, Response } from "express";
const createArticle = async (req: Request, res: Response) => {
    res.send("createArticle");
};
export default createArticle;
