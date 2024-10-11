import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import ApiError from "../../utils/api-error";
const getSingleProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, "Project id  required");
    }
    console.log(id);
    const project = await db.project.findUnique({
        where: {
            id: id,
        },
    });

    if (!project) {
        throw new ApiError(400, "Project not found");
    }

    res.status(200).json(project);
};
export default getSingleProject;
