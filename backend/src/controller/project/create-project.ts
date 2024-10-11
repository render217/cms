import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { ProjectType } from "@prisma/client";
const createProject = async (req: Request, res: Response) => {
    const user = req.user!;
    const { name, description, type } = req.body;

    if (!name || !description || !type) {
        throw new ApiError(400, "All fields are required");
    }

    if (name.length < 3) {
        throw new ApiError(400, "project name should be at least 5 characters");
    }
    if (description.length < 5) {
        throw new ApiError(
            400,
            "project desciprtion should be at least 5 characters"
        );
    }

    if (type !== ProjectType.BACKEND && type !== ProjectType.FRONTEND) {
        throw new ApiError(400, "Invalid project type");
    }

    const existingProject = await db.project.findFirst({
        where: {
            name: {
                equals: name,
                mode: "insensitive",
            },
        },
    });

    if (existingProject) {
        throw new ApiError(400, "project name already exists");
    }
    const newProject = await db.project.create({
        data: {
            name: name,
            description: description,
            type:
                type === ProjectType.FRONTEND
                    ? ProjectType.FRONTEND
                    : ProjectType.BACKEND,
            authorId: user.id,
        },
    });

    res.send(newProject);
};
export default createProject;
