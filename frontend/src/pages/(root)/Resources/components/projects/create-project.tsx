import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Stack,
    CircularProgress,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import { ProjectType } from "@/types";
import ProjectService from "@/services/project.service";
import { Can } from "@/context/ability-context";

const projectSchema = z.object({
    name: z.string().min(5, "Title must be at least 5 characters long"),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters long"),
    type: z.enum(["FRONTEND", "BACKEND"], {
        errorMap: () => ({ message: "Please select project type" }),
    }),
});

type ProjectFormType = z.infer<typeof projectSchema>;

export default function CreateProject() {
    const [openDialog, setOpenDialog] = useState(false);
    const form = useForm<ProjectFormType>({
        resolver: zodResolver(projectSchema),
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
        setValue,
    } = form;

    const { mutate, isPending } = ProjectService.createDocument.useMutation();

    const onFormSubmission = async (values: ProjectFormType) => {
        mutate(
            {
                name: values.name,
                description: values.description,
                type: values.type,
            },
            {
                onSuccess: () => {
                    setOpenDialog(false);
                    reset();
                },
            }
        );
    };

    return (
        <>
            <Can I="create" a="Project">
                <Button
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                    sx={{
                        backgroundColor: "#171B36",
                    }}
                    variant={"contained"}>
                    Add Project
                </Button>
            </Can>
            <Dialog
                open={openDialog}
                onClose={() => {
                    if (isPending) return;
                    setOpenDialog(false);
                }}>
                <DialogTitle>Add New Document</DialogTitle>
                <DialogContent>
                    <form noValidate onSubmit={handleSubmit(onFormSubmission)}>
                        <Stack
                            spacing={2}
                            sx={{
                                minWidth: "400px",
                            }}>
                            <TextField
                                fullWidth
                                size="small"
                                label="Project Name"
                                variant="filled"
                                {...register("name")}
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                sx={{ marginBottom: "10px" }}
                                disabled={isPending}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                label="Project Description"
                                variant="filled"
                                {...register("description")}
                                error={!!errors.description}
                                helperText={errors.description?.message}
                                multiline
                                rows={4}
                                sx={{ marginBottom: "10px" }}
                                disabled={isPending}
                            />
                            <FormControl
                                fullWidth
                                size="small"
                                variant="filled"
                                sx={{ marginBottom: "10px" }}>
                                <InputLabel sx={{ fontSize: "small" }}>
                                    Project Type
                                </InputLabel>
                                <Select
                                    {...register("type")}
                                    defaultValue=""
                                    onChange={(e) =>
                                        setValue(
                                            "type",
                                            e.target.value as ProjectType
                                        )
                                    }
                                    error={!!errors.type}
                                    disabled={isPending}>
                                    <MenuItem value="FRONTEND">
                                        Frontend
                                    </MenuItem>
                                    <MenuItem value="BACKEND">Backend</MenuItem>
                                </Select>
                                {errors.type && (
                                    <Typography
                                        variant="caption"
                                        color="error"
                                        sx={{ mt: 1 }}>
                                        {errors.type?.message}
                                    </Typography>
                                )}
                            </FormControl>

                            <Button
                                disabled={isPending}
                                type="submit"
                                variant="contained"
                                sx={{
                                    mt: "30px",
                                    display: "block",
                                    padding: "10px",
                                    backgroundColor: "#171B36",
                                    width: "100%",
                                    marginInline: "auto",
                                }}>
                                {isPending ? (
                                    <CircularProgress
                                        color="inherit"
                                        size={16}
                                    />
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </Stack>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
