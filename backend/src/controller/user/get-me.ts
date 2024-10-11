import type { Request, Response } from "express";
const getMe = async (req: Request, res: Response) => {
    res.send("getMe");
};
export default getMe;
