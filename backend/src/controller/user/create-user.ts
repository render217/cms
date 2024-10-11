import type { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    res.send("createUser");
};
export default createUser;
