import type { Request, Response } from "express";
const getUsers = async (req: Request, res: Response) => {
    res.send("getUsers");
};
export default getUsers;
