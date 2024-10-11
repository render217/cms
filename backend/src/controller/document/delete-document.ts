import type { Request, Response } from "express";
const deleteDocument = async (req: Request, res: Response) => {
    res.send("delete document");
};
export default deleteDocument;
