import type { Request, Response } from "express";

import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { UserStatus } from "@prisma/client";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new ApiError(400, "All Fields required");
    }

    const user = await db.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        throw new ApiError(404, "Invalid credentials");
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
        throw new ApiError(400, "Invalid credentials");
    }

    const token = jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET!);

    res.status(200).json({
        user,
        token,
    });
};
export default login;
