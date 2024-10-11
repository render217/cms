import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import ApiError from "../utils/api-error";
import { db } from "../prisma/db";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    const tokenVal = token.split(" ")[1];
    try {
        const decoded = jsonwebtoken.verify(tokenVal, process.env.JWT_SECRET!);
        const decodedVal = decoded as { id: string };
        const user = await db.user.findUnique({
            where: {
                id: decodedVal.id,
            },
        });

        if (!user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ message: "Unauthorized" });
    }
};

export default checkAuth;
