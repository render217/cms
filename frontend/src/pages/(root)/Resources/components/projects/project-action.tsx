import { IProject } from "@/types";
import { CircularProgress, DialogContent, Stack } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from "@mui/material";
import ProjectService from "@/services/project.service";
import ProjectForm, { ProjectFormType } from "./project-form";
import { Can } from "@/context/ability-context";
export default function ProjectAction({ project }: { project: IProject }) {
    return (
        <Stack direction="row" spacing={2}>
            <EditProject project={project} />
            <DeleteProject project={project} />
        </Stack>
    );
}
export function EditProject({ project }: { project: IProject }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate, isPending } = ProjectService.updateProject.useMutation(
        project.id
    );

    const handleFormSubmit = (values: ProjectFormType) => {
        mutate(
            {
                name: values.name,
                description: values.description,
                type: values.type,
            },
            {
                onSuccess: () => {
                    setOpenDialog(false);
                },
            }
        );
    };
    return (
        <>
            <Can I="update" a="Project">
                <IconButton size="small" onClick={() => setOpenDialog(true)}>
                    <EditIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                        }}
                    />
                </IconButton>
            </Can>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Document</DialogTitle>
                <DialogContent>
                    <ProjectForm
                        defaultValues={{
                            name: project.name,
                            description: project.description,
                            type: project.type,
                        }}
                        onSubmit={handleFormSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}

export function DeleteProject({ project }: { project: IProject }) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = ProjectService.deleteProject.useMutation();

    const handleOk = () => {
        if (isPending) return;
        mutate(project.id, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    const handleCancel = () => {
        if (isPending) return;
        setOpen(false);
    };

    return (
        <>
            <Can I="delete" a="Project">
                <IconButton size="small" onClick={() => setOpen(true)}>
                    <DeleteIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                            color: "#FF0000",
                        }}
                    />
                </IconButton>
            </Can>
            <Dialog
                open={open}
                onClose={() => {
                    if (isPending) return;
                    setOpen(false);
                }}>
                <DialogTitle>Are you sure you want to delete</DialogTitle>

                <DialogActions>
                    <Button
                        disabled={isPending}
                        variant={"outlined"}
                        size="small"
                        sx={{
                            padding: "8px",
                        }}
                        color="warning"
                        autoFocus
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending}
                        size="small"
                        sx={{
                            padding: "8px",
                        }}
                        variant={"outlined"}
                        onClick={handleOk}>
                        {isPending ? (
                            <CircularProgress color="inherit" size={16} />
                        ) : (
                            "Ok"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
