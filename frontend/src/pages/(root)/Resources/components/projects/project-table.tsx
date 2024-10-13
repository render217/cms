import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";

import { Box } from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";

import { IconButton, Tooltip } from "@mui/material";
import ProjectService from "@/services/project.service";
import { projectColumn } from "./project-column";
export default function ProjectTable() {
    const { data, refetch, isError, isRefetching, isLoading } =
        ProjectService.getProjects.useQuery();

    const projectsData = data?.payload ?? [];
    const table = useMaterialReactTable({
        columns: projectColumn,
        data: projectsData,

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
