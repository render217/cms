import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import ApiError from "../../utils/api-error";
const getSingleArticle = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "Article id is required");
    }

    const article = await db.article.findUnique({
        where: {
            id: id,
        },
    });

    if (!article) {
        throw new ApiError(404, "Article not found");
    }

    res.send({ payload: article });
};
export default getSingleArticle;
