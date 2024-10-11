import type { Request, Response } from "express";
const deleteUser = async (req: Request, res: Response) => {
    res.send("deleteUser");
};
export default deleteUser;
