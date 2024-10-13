import UserService from "@/services/user.services";
import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

import { Box } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

import { IconButton, Tooltip } from "@mui/material";
import { userColumn } from "./user-column";
export default function UserTable() {
    const { data, refetch, isError, isRefetching, isLoading } =
        UserService.getUsers.useQuery();
    const usersData = data?.payload ?? [];
    const table = useMaterialReactTable({
        columns: userColumn,
        data: usersData,

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
