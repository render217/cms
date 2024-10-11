import type { Request, Response } from "express";
const getArticles = async (req: Request, res: Response) => {
    res.send("getArticles");
};
export default getArticles;
