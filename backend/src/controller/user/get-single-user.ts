import type { Request, Response } from "express";
const getSingleUser = async (req: Request, res: Response) => {
    res.send("getSingleUser");
};
export default getSingleUser;
