import type { Request, Response } from "express";

import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const deleteArticle = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Article id is required");
    }

    const existingArticle = await db.article.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingArticle) {
        throw new ApiError(404, "Article not found");
    }

    await db.article.delete({
        where: {
            id: id,
        },
    });

    res.status(200).json({ payload: null, message: "successfully deleted" });
};
export default deleteArticle;
