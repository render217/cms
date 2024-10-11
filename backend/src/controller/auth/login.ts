import type { Request, Response } from "express";
const login = async (req: Request, res: Response) => {
    res.send("login");
};
export default login;
