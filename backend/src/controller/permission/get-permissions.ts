import type { Request, Response } from "express";
import { db } from "../../prisma/db";

const getPermissions = async (req: Request, res: Response) => {
    const subjects = await db.permission.groupBy({
        by: ["subject"],
    });

    const subjectOrder = [
        "Article",
        "Document",
        "Project",
        "User",
        "Permission",
    ];

    // Sort subjects based on the predefined order
    const sortedSubjects = subjects.sort((a, b) => {
        const indexA = subjectOrder.indexOf(a.subject);
        const indexB = subjectOrder.indexOf(b.subject);
        return indexA - indexB;
    });

    const groupedPermissions = await Promise.all(
        sortedSubjects.map(async (subject) => {
            const permissions = await db.permission.findMany({
                where: { subject: subject.subject },
                select: {
                    id: true,
                    permissionName: true,
                    scope: true,
                    description: true,
                    action: true,
                    subject: true,
                    fields: true,
                    conditions: true,
                },
            });

            const actionOrder = [
                "manage",
                "create",
                "read",
                "update",
                "delete",
            ];
            const scopeOrder = ["manage", "any", "own"];

            const actions: Record<
                string,
                {
                    scopes: {
                        id: string;
                        permissionName: string;
                        type: string;
                        description: string;
                        conditions: string | null;
                    }[];
                }
            > = {};

            // Organize permissions by action
            for (const permission of permissions) {
                const action = permission.action;

                if (!actions[action]) {
                    actions[action] = { scopes: [] };
                }

                actions[action].scopes.push({
                    id: permission.id,
                    permissionName: permission.permissionName,
                    type: permission.scope,
                    description: permission.description,
                    conditions: permission.conditions,
                });
            }

            // Sort actions based on the predefined order
            const sortedActions = actionOrder.map((action) => ({
                [action]: actions[action] || { scopes: [] },
            }));

            // Sort scopes within each action based on the predefined order
            for (const action of sortedActions) {
                const actionKey = Object.keys(action)[0];
                if (actions[actionKey]) {
                    actions[actionKey].scopes.sort((a, b) => {
                        const indexA = scopeOrder.indexOf(a.type);
                        const indexB = scopeOrder.indexOf(b.type);
                        return indexA - indexB; // Ascending order
                    });
                }
            }

            return {
                subject: subject.subject,
                permissions: [
                    {
                        actions: Object.assign({}, ...sortedActions),
                    },
                ],
            };
        })
    );

    res.json({ payload: groupedPermissions });
};

export default getPermissions;
