import type { Request, Response } from "express";
const getDocuments = async (req: Request, res: Response) => {
    res.send("get documents");
};
export default getDocuments;
