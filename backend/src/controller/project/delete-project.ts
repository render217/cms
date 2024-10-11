import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const deleteProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(404, "Project not found");
    }
    const project = await db.project.findUnique({
        where: {
            id: id,
        },
    });

    if (!project) {
        throw new ApiError(400, "Project not found");
    }

    await db.project.delete({
        where: {
            id: project.id,
        },
    });

    res.status(200).json({
        message: "successfully deleted",
    });
};
export default deleteProject;
