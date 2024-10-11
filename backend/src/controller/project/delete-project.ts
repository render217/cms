import type { Request, Response } from "express";
const deleteProject = async (req: Request, res: Response) => {
    res.send("deleteProject");
};
export default deleteProject;
