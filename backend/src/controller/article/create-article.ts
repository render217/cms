import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const createArticle = async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const user = req.user!;
    if (!title || !content) {
        throw new ApiError(400, "All fields are required");
    }
    const article = await db.article.create({
        data: {
            title,
            content,
            authorId: user.id,
        },
    });
    res.send({ payload: article, message: "successfully create article" });
};
export default createArticle;
