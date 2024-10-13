import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const getUpdateArticle = async (req: Request, res: Response) => {
    const user = req.user!;
    const { title, content } = req.body;
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

    // if (existingArticle.authorId !== user.id) {
    //     throw new ApiError(403, "Access Denied");
    // }

    const updatedArticle = await db.article.update({
        where: {
            id: id,
        },
        data: {
            title: title ?? existingArticle.title,
            content: content ?? existingArticle.content,
        },
    });

    res.status(200).json({
        payload: updatedArticle,
        message: "successfully updated article",
    });
};
export default getUpdateArticle;
