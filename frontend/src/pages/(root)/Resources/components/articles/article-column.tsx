import { IArticle } from "@/types";
import { Typography } from "@mui/material";
import { createMRTColumnHelper } from "material-react-table";
import ArticleAction from "./article-action";

const columnHelper = createMRTColumnHelper<IArticle>();

export const articleColumns = [
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
    columnHelper.accessor("title", {
        header: "Title",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.title.length > 30
                    ? row.original.title.slice(0, 30) + "..."
                    : row.original.title;
            return (
                <Typography sx={{ fontSize: "14px" }}>{trimmedName}</Typography>
            );
        },
    }),
    columnHelper.accessor("content", {
        header: "Content",
        maxSize: 20,
        Cell: ({ row }) => {
            const trimmedName =
                row.original.title.length > 30
                    ? row.original.content.slice(0, 30) + "..."
                    : row.original.content;
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
            const article = row.original;
            return <ArticleAction article={article} />;
        },
    }),
];
