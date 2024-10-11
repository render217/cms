import { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import bcrypt from "bcrypt";
const updateUser = async (req: Request, res: Response) => {
    // const { id } = req.params;
    const user = req.user!;
    const id = user.id;
    const { oldPassword, newPassword } = req.body;

    // if (!id) {
    //     throw new ApiError(400, "User id is required");
    // }

    if (!oldPassword || !newPassword) {
        throw new ApiError(400, "All fields are required");
    }

    if (newPassword.length < 6) {
        throw new ApiError(400, "Password must be at least 6 characters long");
    }

    const existingUser = await db.user.findUnique({
        where: {
            id: id,
        },
    });

    if (!existingUser) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordMatch = await bcrypt.compare(
        oldPassword,
        existingUser.password
    );

    if (!isPasswordMatch) {
        throw new ApiError(400, "Old password is incorrect");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where: {
            id: id,
        },
        data: {
            password: hashedPassword,
        },
    });

    res.status(200).json({ message: "successfully updated" });
};
export default updateUser;
