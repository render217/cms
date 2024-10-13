import { RawRuleOf } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import { DocumentType, ProjectType, UserStatus } from "@prisma/client";
import { AppAbility } from "./abilitites";

// Extend the RawRuleOf type to include permissionName
interface ExtendedRule extends RawRuleOf<AppAbility> {
    permissionName: string;
    scope: string;
    description: string;
}

const articleResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage all article",
        action: "manage",
        subject: "Article",
        scope: "manage",
        description:
            "Full access to manage all articles (create, read, update, delete)",
    },
    {
        permissionName: "create article",
        action: "create",
        subject: "Article",
        scope: "create",
        description: "Allows creating a new article",
    },
    {
        permissionName: "read any article",
        action: "read",
        subject: "Article",
        scope: "any",
        description: "Allows reading any articles",
    },
    {
        permissionName: "update any article",
        action: "update",
        subject: "Article",
        scope: "any",
        description: "Allows updating any articles",
    },
    {
        permissionName: "delete any article",
        action: "delete",
        subject: "Article",
        scope: "any",
        description: "Allows deleting any articles",
    },
    {
        permissionName: "manage own article",
        action: "manage",
        subject: "Article",
        scope: "own",
        conditions: {
            authorId: "${user.id}",
        },
        description: "Full access to manage all articles you created",
    },
    {
        permissionName: "read own article",
        action: "read",
        subject: "Article",
        scope: "own",
        conditions: {
            authorId: "${user.id}",
        },
        description: "Allows reading articles you created",
    },
    {
        permissionName: "update own article",
        action: "update",
        subject: "Article",
        scope: "own",
        conditions: {
            authorId: "${user.id}",
        },
        description: "Allows updating articles you created",
    },
    {
        permissionName: "delete own article",
        action: "delete",
        subject: "Article",
        scope: "own",
        conditions: {
            authorId: "${user.id}",
        },
        description: "Allows deleting articles you created",
    },
];
const documentResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage all document",
        action: "manage",
        subject: "Document",
        scope: "manage",
        description:
            "Full access to manage all documents (create, read, update, delete).",
    },
    {
        permissionName: "create document",
        action: "create",
        subject: "Document",
        scope: "create",
        description: "Permission to create a new document.",
    },
    {
        permissionName: "read any document",
        action: "read",
        subject: "Document",
        scope: "any",
        description: "Allows to read any documents.",
    },
    {
        permissionName: "update any document",
        action: "update",
        subject: "Document",
        scope: "any",
        description: "Allows to update any documents.",
    },
    {
        permissionName: "delete any document",
        action: "delete",
        subject: "Document",
        scope: "any",
        description: "Allows to delete any documents.",
    },
    {
        permissionName: "read public doc",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.PUBLIC,
        },
        scope: "public",
        description: "Allows to read public documents only.",
    },
    {
        permissionName: "read confidential doc",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.CONFIDENTIAL,
        },
        scope: "confidential",
        description: "Allows to read confidential documents only.",
    },
    {
        permissionName: "read internal doc",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.INTERNAL,
        },
        scope: "internal",
        description: "Allows to read internal documents only.",
    },
    {
        permissionName: "read secret doc",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.SECRET,
        },
        scope: "secret",
        description: "Allows to read secret documents only.",
    },
    {
        permissionName: "manage own article",
        action: "manage",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "manage",
        description: "Full access to manage all documents you created.",
    },
    {
        permissionName: "read own doc",
        action: "read",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows to read documents you created.",
    },
    {
        permissionName: "update own document",
        action: "update",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows to update documents you created.",
    },
    {
        permissionName: "delete own document",
        action: "delete",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows to delete documents you created.",
    },
];
const projectResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage all project",
        action: "manage",
        subject: "Project",
        scope: "manage",
        description:
            "Full access to manage all projects (create, read, update, delete).",
    },
    {
        permissionName: "create project",
        action: "create",
        subject: "Project",
        scope: "create",
        description: "Allows creating a new project.",
    },
    {
        permissionName: "read any project",
        action: "read",
        subject: "Project",
        scope: "any",
        description: "Allows reading any projects.",
    },
    {
        permissionName: "update any project",
        action: "update",
        subject: "Project",
        scope: "any",
        description: "Allows updating any projects.",
    },
    {
        permissionName: "delete any project",
        action: "delete",
        subject: "Project",
        scope: "any",
        description: "Allows deleting any projects.",
    },
    {
        permissionName: "read frontend project",
        action: "read",
        subject: "Project",
        conditions: {
            type: ProjectType.FRONTEND,
        },
        scope: "frontend",
        description: "Allows reading frontend projects.",
    },
    {
        permissionName: "read backend project",
        action: "read",
        subject: "Project",
        conditions: {
            type: ProjectType.BACKEND,
        },
        scope: "backend",
        description: "Allows reading backend projects.",
    },
    {
        permissionName: "manage own project",
        action: "manage",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "manage",
        description: "Full access to manage all projects you created.",
    },
    {
        permissionName: "read own project",
        action: "read",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows reading projects you created.",
    },
    {
        permissionName: "update own project",
        action: "update",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows updating projects you created.",
    },
    {
        permissionName: "delete own project",
        action: "delete",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
        scope: "own",
        description: "Allows deleting projects you created.",
    },
];
const userResourceRules: ExtendedRule[] = [
    // create-read-update(status.)-delete-user
    {
        permissionName: "manage all user",
        action: "manage",
        subject: "User",
        scope: "manage",
        description:
            "Full access to manage all users (create, read, update, delete).",
    },
];
const permissionResourceRules: ExtendedRule[] = [
    // manage-permission | involves assign and revoke.
    {
        permissionName: "manage all permission",
        action: "manage",
        subject: "Permission",
        scope: "manage",
        description:
            "Full access to manage all permissions (read, assign, revoke).",
    },
];
// const otherPolicyRules: ExtendedRule[] = [
//     // is-active__User | can perform all action if it is active
//     {
//         permissionName: "is active user",
//         action: "is-active",
//         subject: "User",
//         conditions: {
//             status: UserStatus.ACTIVE,
//         },
//     },
// ];

export const all_rules: ExtendedRule[] = [
    ...articleResourceRules,
    ...documentResourceRules,
    ...projectResourceRules,
    ...userResourceRules,
    ...permissionResourceRules,
    // ...otherPolicyRules,
];
