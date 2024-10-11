import type { Request, Response } from "express";
const createProject = async (req: Request, res: Response) => {
    res.send("createProject");
};
export default createProject;
