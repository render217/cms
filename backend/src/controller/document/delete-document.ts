import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const deleteDocument = async (req: Request, res: Response) => {
    const { id } = req.params;

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

    await db.document.delete({
        where: {
            id: document.id,
        },
    });

    res.status(200).json({ message: "document deleted successfully" });
};
export default deleteDocument;
