import type { Request, Response } from "express";

import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
        throw new ApiError(400, "User id is required");
    }

    const existingUser = await db.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    await db.user.delete({
        where: {
            id: id,
        },
    });

    res.status(200).send("user deleted");
};
export default deleteUser;
