import {
    Button,
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

import { ProjectType } from "@/types";

const projectSchema = z.object({
    name: z.string().min(5, "Title must be at least 5 characters long"),
    description: z
        .string()
        .min(5, "Description must be at least 5 characters long"),
    type: z.enum(["FRONTEND", "BACKEND"], {
        errorMap: () => ({ message: "Please select project type" }),
    }),
});

export type ProjectFormType = z.infer<typeof projectSchema>;

interface ProjectFormProps {
    defaultValues?: Partial<ProjectFormType>;
    isPending: boolean;
    onSubmit: (values: ProjectFormType) => void;
}

export default function ProjectForm({
    defaultValues,
    isPending,
    onSubmit,
}: ProjectFormProps) {
    const form = useForm<ProjectFormType>({
        resolver: zodResolver(projectSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        register,

        formState: { errors },
        setValue,
        watch,
    } = form;

    const selectedType = watch("type");

    return (
        <>
            <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
                            value={selectedType || ""}
                            onChange={(e) =>
                                setValue("type", e.target.value as ProjectType)
                            }
                            error={!!errors.type}
                            disabled={isPending}>
                            <MenuItem value="FRONTEND">Frontend</MenuItem>
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
                            <CircularProgress color="inherit" size={16} />
                        ) : (
                            "Submit"
                        )}
                    </Button>
                </Stack>
            </form>
        </>
    );
}
