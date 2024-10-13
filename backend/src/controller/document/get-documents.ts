import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import { accessibleBy } from "@casl/prisma";
const getDocuments = async (req: Request, res: Response) => {
    const ability = req.abilities!;
    const documents = await db.document.findMany({
        where: accessibleBy(ability).Document,
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
        },
    });
    res.status(200).json({ payload: documents });
};
export default getDocuments;
