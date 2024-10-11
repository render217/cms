import { DocumentType, User, UserStatus } from "@prisma/client";
import { db } from "./db";
import { all_rules } from "../config/all_rules";
import bcrypt from "bcrypt";
async function DropAllTables() {
    const users = db.user.deleteMany({});
    const usersPermission = db.userPermission.deleteMany({});
    const permissions = db.permission.deleteMany({});
    const documents = db.document.deleteMany({});
    const articles = db.article.deleteMany({});
    const projects = db.project.deleteMany({});
    const allDeleted = await Promise.all([
        users,
        usersPermission,
        permissions,
        documents,
        articles,
        projects,
    ]);
    console.log("All tables dropped successfully");
}

async function SeedPermissions() {
    const permissions = all_rules.map((rule) => {
        return db.permission.create({
            data: {
                permissionName: rule.permissionName,
                action: rule.action.toString(),
                subject: rule.subject.toString(),
                conditions: JSON.stringify(rule.conditions),
            },
        });
    });
    const allPermissions = await Promise.all(permissions);
    console.log("Permissions seeded successfully");
}

async function SeedUsers() {
    const password = "test@123";
    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
        username: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        isFirstLogin: false,
    };
    const ModeratorUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
        username: "moderator",
        email: "moderator@gmail.com",
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        isFirstLogin: false,
    };
    const DeveloperUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
        username: "developer",
        email: "developer@gmail.com",
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        isFirstLogin: false,
    };
    const TesterUser: Omit<User, "id" | "createdAt" | "updatedAt"> = {
        username: "tester",
        email: "tester@gmail.com",
        password: hashedPassword,
        status: UserStatus.ACTIVE,
        isFirstLogin: false,
    };

    const users = [adminUser, ModeratorUser, DeveloperUser, TesterUser].map(
        (user) => {
            return db.user.create({
                data: user,
            });
        }
    );

    const allUsers = await Promise.all(users);
    console.log("Users seeded successfully");
}

async function SeedUserPermissions() {
    const user = await db.user.findFirst({
        where: {
            username: "admin",
        },
    });
    if (!user) return;

    const permissions = await db.permission.findMany({
        where: {
            permissionName: {
                notIn: ["is_active_user"],
            },
        },
    });
    const userPermissions = permissions.map((permission) => {
        return db.userPermission.create({
            data: {
                userId: user.id,
                permissionId: permission.id,
            },
        });
    });

    const allUserPermissions = await Promise.all(userPermissions);
    console.log(`${user.username} Permissions seeded successfully`);
}

async function SeedData() {
    // await DropAllTables();
    await SeedPermissions();
    await SeedUsers();
    await SeedUserPermissions();
    console.log("Data seeded successfully");
}

SeedData();
