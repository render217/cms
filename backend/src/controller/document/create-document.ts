import type { Request, Response } from "express";
const createDocument = async (req: Request, res: Response) => {
    res.send("createDocument");
};
export default createDocument;
