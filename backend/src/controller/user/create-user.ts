import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { UserStatus } from "@prisma/client";
import { ForbiddenError } from "@casl/ability";
const createUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;

    const ability = req.abilities!;
    ForbiddenError.from(ability)
        .setMessage("Access Deined")
        .throwUnlessCan("create", "User");

    if (!username || !email || !password) {
        throw new ApiError(400, "All Fields are required.");
    }

    const existingUser = await db.user.findFirst({
        where: {
            OR: [
                {
                    username,
                },
                {
                    email,
                },
            ],
        },
    });

    if (existingUser) {
        throw new ApiError(400, "username or email already exists.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
        data: {
            username,
            email,
            password: hashedPassword,
            status: UserStatus.ACTIVE,
        },
    });

    res.send({ payload: user });
};
export default createUser;
