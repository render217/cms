import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
const assignPermission = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { permissionIds } = req.body;

    if (!userId) {
        throw new ApiError(400, "User id is required");
    }

    if (
        !permissionIds ||
        (Array.isArray(permissionIds) && permissionIds.length === 0)
    ) {
        throw new ApiError(400, "Permission id(s) is required");
    }

    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // normalize to array if a single permission id is passed
    const permissionIdList = Array.isArray(permissionIds)
        ? permissionIds
        : [permissionIds];

    // fetching all permissions that exist in the provided list
    const existingPermissions = await db.permission.findMany({
        where: {
            id: {
                in: permissionIdList,
            },
        },
        select: { id: true },
    });

    // filtering out permissionIds that don't exist in the db.
    const validPermissionIds = existingPermissions.map(
        (permission) => permission.id
    );

    if (validPermissionIds.length === 0) {
        throw new ApiError(404, "No valid permissions found");
    }

    // find existing user permissions
    const exisitngUserPermissions = await db.userPermission.findMany({
        where: {
            userId: user.id,
            permissionId: {
                in: validPermissionIds,
            },
        },
        select: { permissionId: true },
    });

    // Get the permissionIds that are already assigned to the user
    const alreadyAssignedPermissions = new Set(
        exisitngUserPermissions.map((permission) => permission.permissionId)
    );

    const newPermissionIds = validPermissionIds.filter(
        (permissionId) => !alreadyAssignedPermissions.has(permissionId)
    );

    if (newPermissionIds.length === 0) {
        res.status(200).json({ message: "Permissions already assigned" });
        return;
    }

    // assign the new permissions to user.
    const userPermissions = await db.userPermission.createMany({
        data: newPermissionIds.map((permissionId) => ({
            userId: user.id,
            permissionId,
        })),
    });

    res.status(200).json({
        message: "Permissions assigned successfully",
        data: userPermissions,
    });
};
export default assignPermission;
