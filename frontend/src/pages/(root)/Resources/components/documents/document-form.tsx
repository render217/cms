import {
    TextField,
    Stack,
    CircularProgress,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
    Typography,
    Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DocumentType } from "@/types";

const documentSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    type: z.enum(["CONFIDENTIAL", "INTERNAL", "SECRET", "PUBLIC"], {
        errorMap: () => ({ message: "Please select document type" }),
    }),
});

export type DocumentFormType = z.infer<typeof documentSchema>;

interface DocumentFormProps {
    defaultValues?: Partial<DocumentFormType>;
    isPending: boolean;
    onSubmit: (values: DocumentFormType) => void;
}

export function DocumentForm({
    defaultValues,
    isPending,
    onSubmit,
}: DocumentFormProps) {
    const form = useForm<DocumentFormType>({
        resolver: zodResolver(documentSchema),
        defaultValues,
    });
    const {
        handleSubmit,
        watch,
        register,
        formState: { errors },
        setValue,
    } = form;

    const selectedType = watch("type");
    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={2} sx={{ minWidth: "400px" }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Document Title"
                    variant="filled"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    disabled={isPending}
                />
                <FormControl fullWidth size="small" variant="filled">
                    <InputLabel>Document Type</InputLabel>
                    <Select
                        value={selectedType || ""}
                        {...register("type")}
                        onChange={(e) =>
                            setValue("type", e.target.value as DocumentType)
                        }
                        error={!!errors.type}
                        disabled={isPending}>
                        <MenuItem value="CONFIDENTIAL">Confidential</MenuItem>
                        <MenuItem value="INTERNAL">Internal</MenuItem>
                        <MenuItem value="SECRET">Secret</MenuItem>
                        <MenuItem value="PUBLIC">Public</MenuItem>
                    </Select>
                    {errors.type && (
                        <Typography variant="caption" color="error">
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
                        padding: "10px",
                        backgroundColor: "#171B36",
                        width: "100%",
                    }}>
                    {isPending ? (
                        <CircularProgress color="inherit" size={16} />
                    ) : (
                        "Submit"
                    )}
                </Button>
            </Stack>
        </form>
    );
}
