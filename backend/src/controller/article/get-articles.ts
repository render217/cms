import type { Request, Response } from "express";
import { db } from "../../prisma/db";
const getArticles = async (req: Request, res: Response) => {
    const articles = await db.article.findMany({
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
        },
    });
    res.send({ payload: articles });
};
export default getArticles;
