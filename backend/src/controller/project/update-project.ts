import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { ProjectType } from "@prisma/client";
const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;

    const { name, description, type } = req.body;

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

    const prepareType = type === undefined ? project.type : type;

    if (
        prepareType !== ProjectType.BACKEND &&
        prepareType !== ProjectType.FRONTEND
    ) {
        throw new ApiError(400, "Invalid project type");
    }

    const updatedProject = await db.project.update({
        where: {
            id: project.id,
        },
        data: {
            name: name ?? project.name,
            description: description ?? project.description,
            type: prepareType,
        },
    });

    res.status(200).json({
        message: "successfully updated",
    });
};
export default updateProject;
