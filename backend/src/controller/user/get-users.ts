import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { UserStatus } from "@prisma/client";
const getUsers = async (req: Request, res: Response) => {
    const users = await db.user.findMany({
        where: {
            username: {
                notIn: ["admin"],
            },
        },
        orderBy: {
            createdAt: "asc",
        },
    });
    res.send(users);
};
export default getUsers;
