import type { Request, Response } from "express";
const getMe = async (req: Request, res: Response) => {
    res.status(200).json({
        payload: req.user!,
    });
};
export default getMe;
