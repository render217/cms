import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import bcrypt from "bcrypt";
import { UserStatus } from "@prisma/client";
const updateUserStatus = async (req: Request, res: Response) => {
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

    const updatedUser = await db.user.update({
        where: {
            id: id,
        },
        data: {
            status:
                existingUser.status === UserStatus.ACTIVE
                    ? UserStatus.DISABLED
                    : UserStatus.ACTIVE,
        },
    });

    const message =
        updatedUser.status === UserStatus.ACTIVE ? "activated" : "disabled";

    res.status(200).json({
        data: updatedUser,
        message: `User ${message} successfully`,
    });
};

export default updateUserStatus;
