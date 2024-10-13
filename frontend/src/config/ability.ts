import { IUserPermission } from "@/types";
import { AbilityBuilder, PureAbility } from "@casl/ability";
// import { interpolateConditions } from "./interploate";

type CRUD = "read" | "create" | "update" | "delete";
export type AppActions = CRUD | "manage" | "is-active" | "assign" | "revoke";
export type AppSubjects =
    | "all"
    | "User"
    | "Article"
    | "Document"
    | "Project"
    | "Permission";

export type AppAbility = PureAbility<[AppActions, AppSubjects]>;

export function defineAbilityFor(permissions: IUserPermission[]): AppAbility {
    const { can, build } = new AbilityBuilder<AppAbility>(PureAbility);

    permissions?.forEach((permission) => {
        const { action, subject, conditions } = permission.permission;
        if (conditions) {
            can(
                action as AppActions,
                subject as AppSubjects
                // interpolateConditions(conditions, { user })
            );
        } else {
            can(action as AppActions, subject as AppSubjects);
        }
    });

    return build();
}
