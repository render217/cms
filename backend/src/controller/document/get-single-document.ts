import type { Request, Response } from "express";
const getSingleDocument = async (req: Request, res: Response) => {
    res.send("get single Document");
};
export default getSingleDocument;
