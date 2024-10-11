import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import ApiError from "../../utils/api-error";
const getUserPermission = async (req: Request, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
        throw new ApiError(400, "User id is required");
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const permission = await db.userPermission.findMany({
        where: {
            userId: userId,
        },
        include: {
            permission: true,
        },
    });

    res.status(200).json(permission);
};
export default getUserPermission;
