// User type
export type User = {
    id: string;
    username: string;
    email: string;
    status: UserStatus;
    isFirstLogin: boolean;
    createdAt: string; // DateTime in Prisma, converted to ISO string
    updatedAt: string;

    permissions?: UserPermission[];
    //
    articles?: Article[];
    documents?: Document[];
    projects?: Project[];
};

export type UserSummary = {
    id: string;
    username: string;
    email: string;
};

// UserPermission type
export type UserPermission = {
    permissionId: string;
    userId: string;
    permission: Permission;
};

// Permission type
export type Permission = {
    id: string;
    permissionName: string;
    action: string;
    subject: string;
    fields: string[];
    conditions?: string;
};

// Article type
export type Article = {
    id: string;
    title: string;
    content: string;
    author?: UserSummary;
    createdAt: string; // DateTime as ISO string
    updatedAt: string;
};

// Document type
export type Document = {
    id: string;
    title: string;
    type: DocumentType;
    author?: UserSummary;
    createdAt: string;
    updatedAt: string;
};

export type Project = {
    id: string;
    name: string;
    description: string;
    author?: UserSummary;
    createdAt: string;
    updatedAt: string;
};

export enum UserStatus {
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED",
}

export enum DocumentType {
    CONFIDENTIAL = "CONFIDENTIAL",
    INTERNAL = "INTERNAL",
    SECRET = "SECRET",
    PUBLIC = "PUBLIC",
}
