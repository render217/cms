import type { Request, Response } from "express";
import { db } from "../../prisma/db";
const getDocuments = async (req: Request, res: Response) => {
    const documents = await db.document.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(documents);
};
export default getDocuments;
