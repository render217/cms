// import type { Request, Response } from "express";
// import ApiError from "../../utils/api-error";
// import { db } from "../../prisma/db";
// const assignPermission = async (req: Request, res: Response) => {
//     const { userId } = req.params;
//     const { permissionIds } = req.body;
//     console.log({ userId, permissionIds });
//     if (!userId) {
//         throw new ApiError(400, "User id is required");
//     }

//     if (
//         !permissionIds ||
//         (Array.isArray(permissionIds) && permissionIds.length === 0)
//     ) {
//         throw new ApiError(400, "Permission id(s) is required");
//     }

//     const user = await db.user.findUnique({
//         where: {
//             id: userId,
//         },
//     });

//     if (!user) {
//         throw new ApiError(404, "User not found");
//     }

//     // normalize to array if a single permission id is passed
//     const permissionIdList = Array.isArray(permissionIds)
//         ? permissionIds
//         : [permissionIds];

//     // fetching all permissions that exist in the provided list
//     const existingPermissions = await db.permission.findMany({
//         where: {
//             id: {
//                 in: permissionIdList,
//             },
//         },
//         select: { id: true },
//     });

//     // filtering out permissionIds that don't exist in the db.
//     const validPermissionIds = existingPermissions.map(
//         (permission) => permission.id
//     );

//     if (validPermissionIds.length === 0) {
//         throw new ApiError(404, "No valid permissions found");
//     }

//     // find existing user permissions
//     const exisitngUserPermissions = await db.userPermission.findMany({
//         where: {
//             userId: user.id,
//             permissionId: {
//                 in: validPermissionIds,
//             },
//         },
//         select: { permissionId: true },
//     });

//     // Get the permissionIds that are already assigned to the user
//     const alreadyAssignedPermissions = new Set(
//         exisitngUserPermissions.map((permission) => permission.permissionId)
//     );

//     const newPermissionIds = validPermissionIds.filter(
//         (permissionId) => !alreadyAssignedPermissions.has(permissionId)
//     );

//     if (newPermissionIds.length === 0) {
//         res.status(200).json({ message: "Permissions already assigned" });
//         return;
//     }

//     // assign the new permissions to user.
//     const userPermissions = await db.userPermission.createMany({
//         data: newPermissionIds.map((permissionId) => ({
//             userId: user.id,
//             permissionId,
//         })),
//     });

//     res.status(200).json({
//         message: "Permissions assigned successfully",
//         payload: userPermissions,
//     });
// };
// export default assignPermission;
import type { Request, Response } from "express";
import ApiError from "../../utils/api-error";
import { db } from "../../prisma/db";
import { ForbiddenError } from "@casl/ability";

const assignPermission = async (req: Request, res: Response) => {
    const ability = req.abilities!;
    ForbiddenError.from(ability).throwUnlessCan("manage", "Permission");

    const { userId } = req.params;
    const { permissionIds } = req.body; // Expecting an array of permission IDs
    console.log({ userId, permissionIds });

    if (!userId) {
        throw new ApiError(400, "User id is required");
    }

    if (
        !permissionIds ||
        (Array.isArray(permissionIds) && permissionIds.length === 0)
    ) {
        throw new ApiError(400, "Permission id(s) is required");
    }

    // Fetch the user to whom we will assign permissions
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    // Fetch existing user permissions
    const existingUserPermissions = await db.userPermission.findMany({
        where: {
            userId: user.id,
        },
        select: { permissionId: true },
    });

    // Remove all existing permissions for the user
    await db.userPermission.deleteMany({
        where: {
            userId: user.id,
        },
    });

    // Normalize to array if a single permission id is passed
    const permissionIdList = Array.isArray(permissionIds)
        ? permissionIds
        : [permissionIds];

    // Fetching all permissions that exist in the provided list
    const existingPermissions = await db.permission.findMany({
        where: {
            id: {
                in: permissionIdList,
            },
        },
        select: { id: true },
    });

    // Filter for valid permission IDs
    const validPermissionIds = existingPermissions.map(
        (permission) => permission.id
    );

    if (validPermissionIds.length === 0) {
        throw new ApiError(404, "No valid permissions found");
    }

    // Assign the new permissions to the user
    const userPermissions = await db.userPermission.createMany({
        data: validPermissionIds.map((permissionId) => ({
            userId: user.id,
            permissionId,
        })),
    });

    res.status(200).json({
        message: "Permissions updated successfully",
        payload: userPermissions,
    });
};

export default assignPermission;
