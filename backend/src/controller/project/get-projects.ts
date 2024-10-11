import type { Request, Response } from "express";
const getProjects = async (req: Request, res: Response) => {
    res.send("getProjects");
};
export default getProjects;
