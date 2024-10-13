import { IUser } from "@/types";
import { Typography } from "@mui/material";
import { createMRTColumnHelper } from "material-react-table";
import ManagePermission from "./manage-permission";
import UserAction from "./user-action";
import UserStatusSwitch from "./user-status-switch";
const columnHelper = createMRTColumnHelper<IUser>();

export const userColumn = [
    columnHelper.display({
        header: "No",
        size: 5,
        enableGlobalFilter: false,
        enableColumnFilter: false,
        enableColumnActions: false,
        muiTableHeadCellProps: {
            align: "center",
        },

        Cell: ({ row }) => {
            return (
                <Typography sx={{ textAlign: "center" }}>
                    {row.index + 1}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("username", {
        header: "Username",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedUsername =
                row.original.username.length > 20
                    ? row.original.username.slice(0, 20) + "..."
                    : row.original.username;
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {trimmedUsername}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("email", {
        header: "Email",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedEmail =
                row.original.email.length > 20
                    ? row.original.email.slice(0, 20) + "..."
                    : row.original.email;
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {trimmedEmail}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "createdAt",
        maxSize: 20,
        Cell: ({ row }) => {
            const time = new Date(row.original.createdAt).toLocaleDateString();
            return <Typography sx={{ fontSize: "14px" }}>{time}</Typography>;
        },
    }),
    columnHelper.accessor("status", {
        header: "Status",
        maxSize: 20,
        Cell: ({ row }) => {
            return <UserStatusSwitch user={row.original} />;
        },
    }),
    columnHelper.display({
        header: "Permission",
        maxSize: 20,
        Cell: ({ row }) => {
            const user = row.original;

            return <ManagePermission user={user} />;
        },
    }),

    columnHelper.display({
        header: "Action",
        maxSize: 20,
        Cell: ({ row }) => {
            const user = row.original;
            return <UserAction user={user} />;
        },
    }),
];
