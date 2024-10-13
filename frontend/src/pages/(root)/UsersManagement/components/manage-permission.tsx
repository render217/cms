import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    CircularProgress,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Box,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PermissionService from "@/services/permission.service";
import { IUser } from "@/types";
import { Can } from "@/context/ability-context";

export default function ManagePermission({ user }: { user: IUser }) {
    const [openDialog, setOpenDialog] = useState(false);
    const isPending = false;

    const { mutate, isPending: isAssigning } =
        PermissionService.assignPermission.useMutation(user?.id);
    const { data, isLoading } = PermissionService.getPermissions.useQuery();

    const { data: userData, isLoading: isLoading2 } =
        PermissionService.getUserPermission.useQuery(user?.id);

    const userPermissions = React.useMemo(
        () => userData?.payload ?? [],
        [userData]
    );
    const payload = data?.payload ?? [];

    const [permissionIds, setPermissionIds] = useState<string[]>([]);

    console.log({ userPermissions });
    useEffect(() => {
        const userPIds = userPermissions.map((p) => p.permission.id);

        setPermissionIds(userPIds);
    }, [userData, userPermissions]);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        if (event.target.checked) {
            setPermissionIds((prev) => [...prev, id]);
        } else {
            setPermissionIds((prev) =>
                prev.filter((permissionId) => permissionId !== id)
            );
        }
    };

    const handleSaveChanges = () => {
        if (isAssigning) return;
        mutate(
            { permissionIds },
            {
                onSuccess: () => {
                    setOpenDialog(false);
                },
            }
        );
    };

    return (
        <>
            <Can I="manage" a="Permission" passThrough>
                {(allowed) => {
                    return (
                        <Button
                            disabled={!allowed}
                            onClick={() => setOpenDialog(true)}
                            size="small"
                            sx={{
                                backgroundColor: "#171B36",
                            }}
                            variant={"contained"}>
                            Manage
                        </Button>
                    );
                }}
            </Can>
            <Dialog
                open={openDialog}
                onClose={() => {
                    if (isPending) return;
                    setOpenDialog(false);
                }}
                fullScreen>
                <DialogTitle>Manage Permission</DialogTitle>
                <DialogContent
                    sx={{
                        padding: "15px",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                    {isLoading || isLoading2 ? (
                        <CircularProgress
                            sx={{
                                alignSelf: "center",
                                marginTop: "200px",
                            }}
                        />
                    ) : (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: "10px",
                                padding: "10px",
                                borderRadius: "8px",
                            }}>
                            {payload.map((item) => (
                                <Accordion
                                    defaultExpanded
                                    key={item.subject}
                                    sx={{
                                        // mb: 1,
                                        flexBasis: "30%",
                                        height: "fit-content",
                                    }}>
                                    <AccordionSummary
                                        expandIcon={
                                            <ExpandMoreIcon
                                                sx={{ fontSize: "16px" }}
                                            />
                                        }
                                        sx={{
                                            padding: "10px 10px",
                                            minHeight: "20px",
                                            backgroundColor: "#f0f4f8",
                                            "& .MuiAccordionSummary-content": {
                                                margin: 0,
                                            },
                                            "&.Mui-expanded": {
                                                minHeight: "20px",
                                                padding: "10px 10px",
                                            },
                                        }}>
                                        <Typography
                                            sx={{
                                                fontSize: "14px",
                                                fontWeight: "bold",
                                            }}>
                                            {item.subject}
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails sx={{ padding: "8px" }}>
                                        {/* Table to organize actions and scopes */}
                                        <Table sx={{ fontSize: "12px" }}>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            padding: "4px",
                                                        }}>
                                                        <strong>Action</strong>
                                                    </TableCell>
                                                    <TableCell
                                                        sx={{
                                                            fontSize: "12px",
                                                            padding: "4px",
                                                        }}>
                                                        <strong>Scopes</strong>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {item.permissions.map((perm) =>
                                                    Object.keys(
                                                        perm.actions
                                                    ).map((actionKey) => {
                                                        const action =
                                                            actionKey as keyof typeof perm.actions;
                                                        const scopes =
                                                            perm.actions[action]
                                                                .scopes;

                                                        if (scopes.length > 0) {
                                                            return (
                                                                <TableRow
                                                                    key={
                                                                        action
                                                                    }>
                                                                    {/* Left axis: Action */}
                                                                    <TableCell
                                                                        sx={{
                                                                            fontSize:
                                                                                "12px",
                                                                            padding:
                                                                                "4px",
                                                                        }}>
                                                                        <Typography fontSize="12px">
                                                                            {
                                                                                action
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                    {/* Right axis: Scopes (render checkboxes) */}
                                                                    <TableCell
                                                                        sx={{
                                                                            padding:
                                                                                "4px",
                                                                            display:
                                                                                "flex",
                                                                            flexDirection:
                                                                                "row",
                                                                            flexWrap:
                                                                                "wrap",
                                                                            gap: "10px",
                                                                        }}>
                                                                        {scopes.map(
                                                                            (
                                                                                scope
                                                                            ) => (
                                                                                <FormControlLabel
                                                                                    key={
                                                                                        scope.id
                                                                                    }
                                                                                    sx={{
                                                                                        margin: 0,
                                                                                        padding:
                                                                                            "2px 0",
                                                                                        width: "160px",
                                                                                    }}
                                                                                    control={
                                                                                        <Checkbox
                                                                                            checked={permissionIds.includes(
                                                                                                scope.id
                                                                                            )}
                                                                                            sx={{
                                                                                                padding:
                                                                                                    "0px",
                                                                                                marginRight:
                                                                                                    "4px",
                                                                                            }}
                                                                                            onChange={(
                                                                                                e
                                                                                            ) =>
                                                                                                handleCheckboxChange(
                                                                                                    e,
                                                                                                    scope.id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    }
                                                                                    label={
                                                                                        <Typography fontSize="12px">
                                                                                            {
                                                                                                scope.permissionName
                                                                                            }
                                                                                        </Typography>
                                                                                    }
                                                                                />
                                                                            )
                                                                        )}
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                        return null;
                                                    })
                                                )}
                                            </TableBody>
                                        </Table>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    )}
                </DialogContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        padding: "16px",
                    }}>
                    <Button
                        disabled={isAssigning}
                        variant="contained"
                        color="primary"
                        onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Box>
            </Dialog>
        </>
    );
}
