import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const getSingleUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "User id is required");
    }
    const user = await db.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.send(user);
};
export default getSingleUser;
