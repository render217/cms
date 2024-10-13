import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

import { Box } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

import { IconButton, Tooltip } from "@mui/material";

import { documentColumn } from "./document-column";
import DocumentService from "@/services/document.service";

export default function DocumentTable() {
    const { data, refetch, isError, isRefetching, isLoading } =
        DocumentService.getDocuments.useQuery();

    const documentsData = data?.payload ?? [];
    const table = useMaterialReactTable({
        columns: documentColumn,
        data: documentsData,

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
