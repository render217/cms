import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { ForbiddenError, subject } from "@casl/ability";
const deleteDocument = async (req: Request, res: Response) => {
    const ability = req.abilities!;
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
    ForbiddenError.from(ability).throwUnlessCan(
        "create",
        subject("Document", document)
    );
    await db.document.delete({
        where: {
            id: document.id,
        },
    });

    res.status(200).json({
        payload: null,
        message: "document deleted successfully",
    });
};
export default deleteDocument;
