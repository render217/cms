import { PureAbility, AbilityBuilder, ExtractSubjectType } from "@casl/ability";
import { createPrismaAbility, PrismaQuery, Subjects } from "@casl/prisma";
import {
    User,
    Article,
    Document,
    Permission,
    Project,
    DocumentType,
    UserStatus,
} from "@prisma/client";
import { db } from "../prisma/db";
import { interpolateConditions } from "../utils/helpers";

type CRUD = "read" | "create" | "update" | "delete";
export type AppActions = CRUD | "manage" | "is-active" | "assign" | "revoke";
export type AppSubjects =
    | "all"
    | Subjects<{
          User: User;
          Article: Article;
          Document: Document;
          Project: Project;
          Permission: Permission;
      }>;

export type AppAbility = PureAbility<[AppActions, AppSubjects], PrismaQuery>;

// fetch user permission from database
export async function getUserPermissionRule(user: User) {
    const userPermission = await db.userPermission.findMany({
        where: {
            userId: user.id,
        },
        include: {
            permission: {
                select: {
                    action: true,
                    subject: true,
                    fields: true,
                    conditions: true,
                },
            },
        },
    });

    const rules = userPermission.map((up) => {
        return {
            action: up.permission.action as AppActions,
            subject: up.permission.subject as ExtractSubjectType<AppSubjects>,
            fields: up.permission.fields as string[],
            conditions: up.permission.conditions,
        };
    });

    return rules;
}

// define abilities
export async function defineRulesFor(user: User) {
    const { can, build } = new AbilityBuilder<AppAbility>(createPrismaAbility);

    // get user permission.
    const permissions = await getUserPermissionRule(user);

    // define rules
    permissions.forEach((rule) => {
        if (rule.conditions) {
            const conditions = interpolateConditions(rule.conditions, { user });
            can(rule.action, rule.subject, conditions);
        } else {
            can(rule.action, rule.subject);
        }
    });

    return build();
}
