import type { Request, Response } from "express";
const revokePermission = async (req: Request, res: Response) => {
    res.send("revoke Permission");
};
export default revokePermission;
