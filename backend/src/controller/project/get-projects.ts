import type { Request, Response } from "express";
import { db } from "../../prisma/db";
const getProjects = async (req: Request, res: Response) => {
    const projects = await db.project.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.status(200).json(projects);
};
export default getProjects;
