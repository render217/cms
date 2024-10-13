import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { UserStatus } from "@prisma/client";
import { accessibleBy } from "@casl/prisma";
const getUsers = async (req: Request, res: Response) => {
    const ability = req.abilities!;

    const users = await db.user.findMany({
        where: {
            AND: [
                accessibleBy(ability).User,
                {
                    username: {
                        notIn: ["admin"],
                    },
                },
            ],
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    res.send({ payload: users });
};
export default getUsers;
