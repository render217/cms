import type { Request, Response } from "express";
const getSingleArticle = async (req: Request, res: Response) => {
    res.send("getSingleArticle");
};
export default getSingleArticle;
