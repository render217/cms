import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import { accessibleBy } from "@casl/prisma";
const getProjects = async (req: Request, res: Response) => {
    const ability = req.abilities!;
    const projects = await db.project.findMany({
        where: {
            AND: [accessibleBy(ability).Project],
        },
        orderBy: {
            createdAt: "desc",
        },
        include: {
            author: true,
        },
    });
    res.status(200).json({ payload: projects });
};
export default getProjects;
