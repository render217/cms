// User type
export type IUser = {
    id: string;
    username: string;
    email: string;
    status: UserStatusType;
    isFirstLogin: boolean;
    createdAt: string;
    updatedAt: string;

    permissions?: IUserPermission[];
    //
    articles?: IArticle[];
    documents?: IDocument[];
    projects?: IProject[];
};

export type IUserSummary = {
    id: string;
    username: string;
    email: string;
};

// UserPermission type
export type IUserPermission = {
    permissionId: string;
    userId: string;
    permission: IPermission;
};

// Permission type
export type IPermission = {
    id: string;
    permissionName: string;
    action: string;
    subject: string;
    fields: string[];
    conditions?: string;
};

// export type IGroupedPermission = {
//     subject: string;
//     permissions: IPermission[];
// };

interface Scope {
    id: string;
    permissionName: string;
    type: string;
    description: string;
    conditions: string | null;
}

interface Action {
    manage: {
        scopes: Scope[];
    };
    create: {
        scopes: Scope[];
    };
    read: {
        scopes: Scope[];
    };
    update: {
        scopes: Scope[];
    };
    delete: {
        scopes: Scope[];
    };
}

export type IGroupedPermission = {
    subject: string;
    permissions: {
        actions: Action;
    }[];
};
// export type IGroupedPermission = Permission[];

// Article type
export type IArticle = {
    id: string;
    title: string;
    content: string;
    author?: IUserSummary;
    createdAt: string; // DateTime as ISO string
    updatedAt: string;
};

// Document type
export type IDocument = {
    id: string;
    title: string;
    type: DocumentType;
    author?: IUserSummary;
    createdAt: string;
    updatedAt: string;
};

export type IProject = {
    id: string;
    name: string;
    description: string;
    type: ProjectType;
    author?: IUserSummary;
    createdAt: string;
    updatedAt: string;
};

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
}

export type UserStatusType = "ACTIVE" | "DISABLED";
export type ProjectType = "FRONTEND" | "BACKEND";
export type DocumentType = "CONFIDENTIAL" | "INTERNAL" | "SECRET" | "PUBLIC";

export enum DocumentTypeEnum {
    CONFIDENTIAL = "CONFIDENTIAL",
    INTERNAL = "INTERNAL",
    SECRET = "SECRET",
    PUBLIC = "PUBLIC",
}
