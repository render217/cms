import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import ArticleService from "@/services/article.services";
import { Box } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import { articleColumns } from "./article-column";
import { IconButton, Tooltip } from "@mui/material";

export default function ArticlesTable() {
    const { data, refetch, isError, isRefetching, isLoading } =
        ArticleService.getArticles.useQuery();

    const articlesData = data?.payload ?? [];

    const table = useMaterialReactTable({
        columns: articleColumns,
        data: articlesData,

        enableRowSelection: false,
        enableColumnOrdering: false,
        enableDensityToggle: false,
        enableGlobalFilter: true,
        muiToolbarAlertBannerProps: isError
            ? {
                  color: "error",
                  children: "Error loading data",
              }
            : undefined,
        defaultDisplayColumn: {
            maxSize: 100,
            size: 40,
            minSize: 40,
        },
        muiSearchTextFieldProps: {
            size: "small",
            variant: "outlined",
        },
        muiTableProps: {
            size: "small",
        },
        enableColumnResizing: false,

        initialState: { density: "compact" },
        state: {
            isLoading,

            showAlertBanner: isError,
            showProgressBars: isRefetching,
        },
        renderTopToolbarCustomActions: () => (
            <Tooltip arrow title="Refresh Data">
                <IconButton onClick={() => refetch()}>
                    <RefreshIcon />
                </IconButton>
            </Tooltip>
        ),
    });
    return (
        <Box sx={{ paddingInline: "" }}>
            <MaterialReactTable table={table} />
        </Box>
    );
}
