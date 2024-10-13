import { IProject } from "@/types";
import { Typography } from "@mui/material";
import { createMRTColumnHelper } from "material-react-table";
import { ProjectTypeDisplay } from "./project-type";
import ProjectAction from "./project-action";

const columnHelper = createMRTColumnHelper<IProject>();

export const projectColumn = [
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
    columnHelper.accessor("author", {
        header: "Author",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedAuthor = row.original.author?.username
                ? row.original.author?.username.length > 20
                    ? row.original?.author?.username.slice(0, 20) + "..."
                    : row.original?.author?.username
                : "Unknown";
            return (
                <Typography sx={{ fontSize: "14px" }}>
                    {trimmedAuthor}
                </Typography>
            );
        },
    }),
    columnHelper.accessor("name", {
        header: "Project name",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.name.length > 30
                    ? row.original.name.slice(0, 30) + "..."
                    : row.original.name;
            return (
                <Typography sx={{ fontSize: "14px" }}>{trimmedName}</Typography>
            );
        },
    }),
    columnHelper.accessor("type", {
        header: "Project type",
        maxSize: 20,
        Cell: ({ row }) => {
            const projectType = row.original.type;
            return <ProjectTypeDisplay type={projectType} />;
        },
    }),
    columnHelper.accessor("description", {
        header: "Description",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.description.length > 30
                    ? row.original.description.slice(0, 30) + "..."
                    : row.original.description;
            return (
                <Typography sx={{ fontSize: "14px" }}>{trimmedName}</Typography>
            );
        },
    }),
    columnHelper.display({
        header: "Actions",
        size: 10,
        // muiTableHeadCellProps: {
        //     align: "center",
        // },
        // muiTableBodyCellProps: {
        //     align: "center",
        // },
        Cell: ({ row }) => {
            const project = row.original;
            return <ProjectAction project={project} />;
        },
    }),
];
