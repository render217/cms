import type { Request, Response } from "express";
const getUserPermission = async (req: Request, res: Response) => {
    res.send("getUserPermission");
};
export default getUserPermission;
