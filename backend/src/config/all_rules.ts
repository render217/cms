import { RawRuleOf } from "@casl/ability";
import { createPrismaAbility } from "@casl/prisma";
import { DocumentType, ProjectType, UserStatus } from "@prisma/client";
import { AppAbility } from "./abilitites";

// Extend the RawRuleOf type to include permissionName
interface ExtendedRule extends RawRuleOf<AppAbility> {
    permissionName: string;
}

const articleResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage_article",
        action: "manage",
        subject: "Article",
    },
    {
        permissionName: "create_article",
        action: "create",
        subject: "Article",
    },
    {
        permissionName: "read_all_article",
        action: "read",
        subject: "Article",
    },
    {
        permissionName: "update_all_article",
        action: "update",
        subject: "Article",
    },
    {
        permissionName: "delete_all_article",
        action: "delete",
        subject: "Article",
    },
    {
        permissionName: "manage_own_article",
        action: "manage",
        subject: "Article",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "read_own_article",
        action: "read",
        subject: "Article",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "update_own_article",
        action: "update",
        subject: "Article",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "delete_own_article",
        action: "delete",
        subject: "Article",
        conditions: {
            authorId: "${user.id}",
        },
    },
];
const documentResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage_article",
        action: "manage",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
    },
    // CREATE_DOCUMENT
    {
        permissionName: "create_document",
        action: "create",
        subject: "Document",
    },
    // READ_UPDATE_DELETE_ALL_DOCUMENT
    {
        permissionName: "read_all_document",
        action: "read",
        subject: "Document",
    },
    {
        permissionName: "update_all_document",
        action: "update",
        subject: "Document",
    },
    {
        permissionName: "delete_all_document",
        action: "delete",
        subject: "Document",
    },
    // READ_DOCUMENT_BY_TYPE
    {
        permissionName: "read_public_document",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.PUBLIC,
        },
    },
    {
        permissionName: "read_confidential_document",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.CONFIDENTIAL,
        },
    },
    {
        permissionName: "read_internal_document",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.INTERNAL,
        },
    },
    {
        permissionName: "read_secret_document",
        action: "read",
        subject: "Document",
        conditions: {
            type: DocumentType.SECRET,
        },
    },
    // READ_UPDATE_DELETE_OWN_DOCUMENT
    {
        permissionName: "manage_own_article",
        action: "manage",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "read_own_document",
        action: "read",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "update_own_document",
        action: "update",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "delete_own_document",
        action: "delete",
        subject: "Document",
        conditions: {
            authorId: "${user.id}",
        },
    },
];
const projectResourceRules: ExtendedRule[] = [
    {
        permissionName: "manage_project",
        action: "manage",
        subject: "Project",
    },
    {
        permissionName: "create_project",
        action: "create",
        subject: "Project",
    },
    {
        permissionName: "read_all_project",
        action: "read",
        subject: "Project",
    },
    {
        permissionName: "update_all_project",
        action: "update",
        subject: "Project",
    },
    {
        permissionName: "delete_all_project",
        action: "delete",
        subject: "Project",
    },
    {
        permissionName: "read_frontend_project",
        action: "read",
        subject: "Project",
        conditions: {
            type: ProjectType.FRONTEND,
        },
    },
    {
        permissionName: "read_frontend_project",
        action: "read",
        subject: "Project",
        conditions: {
            type: ProjectType.BACKEND,
        },
    },
    {
        permissionName: "manage_project",
        action: "manage",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "read_own_project",
        action: "read",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "update_own_project",
        action: "update",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
    },
    {
        permissionName: "delete_own_project",
        action: "delete",
        subject: "Project",
        conditions: {
            authorId: "${user.id}",
        },
    },
];
const userResourceRules: ExtendedRule[] = [
    // create-read-update(status.)-delete-user
    {
        permissionName: "manage_user",
        action: "manage",
        subject: "User",
    },
    {
        permissionName: "create_user",
        action: "create",
        subject: "User",
    },
    {
        permissionName: "read_user",
        action: "read",
        subject: "User",
    },
    {
        permissionName: "update_user",
        action: "update",
        subject: "User",
    },
    {
        permissionName: "delete_user",
        action: "delete",
        subject: "User",
    },
];
const permissionResourceRules: ExtendedRule[] = [
    // manage-permission | involves assign and revoke.
    {
        permissionName: "manage_permission",
        action: "manage",
        subject: "Permission",
    },
];
const otherPolicyRules: ExtendedRule[] = [
    // is-active__User | can perform all action if it is active
    {
        permissionName: "is_active_user",
        action: "is-active",
        subject: "User",
        conditions: {
            status: UserStatus.ACTIVE,
        },
    },
];

export const all_rules: ExtendedRule[] = [
    ...articleResourceRules,
    ...documentResourceRules,
    ...projectResourceRules,
    ...userResourceRules,
    ...permissionResourceRules,
    ...otherPolicyRules,
];
