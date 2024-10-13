import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { DocumentType } from "@prisma/client";
import { ForbiddenError } from "@casl/ability";
const createDocument = async (req: Request, res: Response) => {
    const user = req.user!;
    const ability = req.abilities!;
    ForbiddenError.from(ability).throwUnlessCan("create", "Document");
    const { title, type } = req.body;
    if (!title || !type) {
        throw new ApiError(400, "All fields are required");
    }

    if (
        type !== DocumentType.INTERNAL &&
        type !== DocumentType.CONFIDENTIAL &&
        type !== DocumentType.PUBLIC &&
        type !== DocumentType.SECRET
    ) {
        throw new ApiError(400, "Invalid document type");
    }

    const newDocument = await db.document.create({
        data: {
            title: title,
            type: type,
            authorId: user.id,
        },
    });

    res.json({ payload: newDocument, message: "successfully create document" });
};
export default createDocument;
