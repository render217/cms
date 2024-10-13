import type { Request, Response } from "express";

import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { ForbiddenError } from "@casl/ability";

const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const ability = req.abilities!;
    ForbiddenError.from(ability)
        .setMessage("Access Deined")
        .throwUnlessCan("delete", "User");
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

    res.status(200).send({
        payload: {},
        message: "user deleted",
    });
};
export default deleteUser;
