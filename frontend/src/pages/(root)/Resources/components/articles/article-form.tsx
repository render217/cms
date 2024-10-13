import { TextField, Button, Stack, CircularProgress } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

const articleSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters long"),
    content: z.string().min(2, "Content must be at least 2 characters long"),
});

type ArticleFormType = z.infer<typeof articleSchema>;

interface ArticleFormProps {
    initialData?: ArticleFormType;
    onSubmit: (data: ArticleFormType) => void;
    isPending?: boolean;
}

export default function ArticleForm({
    initialData,
    onSubmit,
    isPending = false,
}: ArticleFormProps) {
    const form = useForm<ArticleFormType>({
        resolver: zodResolver(articleSchema),
        defaultValues: initialData || {
            title: "",
            content: "",
        },
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = form;

    useEffect(() => {
        if (initialData) {
            reset(initialData);
        }
    }, [initialData, reset]);

    return (
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <Stack
                spacing={2}
                sx={{
                    minWidth: "400px",
                }}>
                <TextField
                    fullWidth
                    size="small"
                    label="Article Title"
                    variant="filled"
                    {...register("title")}
                    error={!!errors.title}
                    helperText={errors.title?.message}
                    sx={{ marginBottom: "10px" }}
                    disabled={isPending}
                />
                <TextField
                    fullWidth
                    size="small"
                    label="Article Content"
                    variant="filled"
                    {...register("content")}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    multiline
                    rows={4}
                    sx={{ marginBottom: "10px" }}
                    disabled={isPending}
                />
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
    );
}
