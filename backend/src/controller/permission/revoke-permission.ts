import type { Request, Response } from "express";
import { db } from "../../prisma/db";
import ApiError from "../../utils/api-error";

const revokePermission = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { permissionIds } = req.body;

    if (!userId) {
        throw new ApiError(400, "User id is required");
    }

    if (
        !permissionIds ||
        (Array.isArray(permissionIds) && permissionIds.length === 0)
    ) {
        throw new ApiError(400, "Permission id(s) are required");
    }

    // normalizing to array.
    const permissionIdList = Array.isArray(permissionIds)
        ? permissionIds
        : [permissionIds];

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const existingPermissions = await db.permission.findMany({
        where: {
            id: {
                in: permissionIdList,
            },
        },
        select: { id: true },
    });

    //filtering out permission that doesn't exist in db.
    const validPermissionIds = existingPermissions.map(
        (permission) => permission.id
    );

    if (validPermissionIds.length === 0) {
        res.status(400).json({ message: "No valid permissions found" });
        return;
    }

    //fining the permission that need to be revoked
    const existingUserPermissions = await db.userPermission.findMany({
        where: {
            userId: userId,
            permissionId: { in: validPermissionIds },
        },
        select: { permissionId: true },
    });

    const assignedPermissions = existingUserPermissions.map(
        (up) => up.permissionId
    );

    if (assignedPermissions.length === 0) {
        res.status(200).json({ message: "No permissions to revoke" });
        return;
    }

    // Revoke only the assigned permissions
    await db.userPermission.deleteMany({
        where: {
            userId: userId,
            permissionId: {
                in: assignedPermissions,
            },
        },
    });

    res.status(200).json({ message: "Successfully revoked permissions" });
};

export default revokePermission;
