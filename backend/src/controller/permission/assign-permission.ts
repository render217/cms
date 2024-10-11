import type { Request, Response } from "express";
const assignPermission = async (req: Request, res: Response) => {
    res.send("assignPermission");
};
export default assignPermission;
