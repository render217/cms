import type { Request, Response } from "express";
import { db } from "../../prisma/db";
const getPermissions = async (req: Request, res: Response) => {
    const subjects = await db.permission.groupBy({
        by: ["subject"],
    });

    const groupedPermissions = await Promise.all(
        subjects.map(async (subject) => {
            const permissions = await db.permission.findMany({
                where: { subject: subject.subject },
                select: {
                    id: true,
                    permissionName: true,
                    action: true,
                    subject: true,
                    fields: true,
                    conditions: true,
                },
                orderBy: {
                    conditions: "desc",
                },
            });
            return {
                subject: subject.subject,
                data: permissions,
            };
        })
    );

    res.json(groupedPermissions);
};
export default getPermissions;
