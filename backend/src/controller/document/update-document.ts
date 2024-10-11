import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { DocumentType } from "@prisma/client";
const updateDocument = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, type } = req.body;
    if (!id) {
        throw new ApiError(400, "Document id is required");
    }

    const document = await db.document.findUnique({
        where: {
            id: id,
        },
    });

    if (!document) {
        throw new ApiError(404, "Document not found");
    }

    const documentType = type === undefined ? document.type : type;

    if (
        documentType !== DocumentType.CONFIDENTIAL &&
        documentType !== DocumentType.PUBLIC &&
        documentType !== DocumentType.INTERNAL &&
        documentType !== DocumentType.SECRET
    ) {
        throw new ApiError(400, "Invalid document type");
    }

    const updatedDocument = await db.document.update({
        where: {
            id: document.id,
        },
        data: {
            title: title ?? document.title,
            type: documentType,
        },
    });

    res.status(200).json({ message: "document updated successfully" });
};
export default updateDocument;
