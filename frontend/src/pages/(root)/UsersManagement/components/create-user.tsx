import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Stack,
    CircularProgress,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import UserService from "@/services/user.services";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const userSchema = z.object({
    username: z.string().min(4, "Username must be at least 4 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type UserFormType = z.infer<typeof userSchema>;

export default function CreateUser() {
    const [openDialog, setOpenDialog] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const form = useForm<UserFormType>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            password: "test@123",
        },
    });
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = form;

    const { mutate, isPending } = UserService.createUser.useMutation();

    const onFormSubmission = async (values: UserFormType) => {
        mutate(
            {
                username: values.username,
                email: values.email,
                password: values.password,
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
            <Button
                onClick={() => setOpenDialog(true)}
                sx={{
                    backgroundColor: "#171B36",
                }}
                variant={"contained"}>
                Add New User
            </Button>

            <Dialog
                open={openDialog}
                onClose={() => {
                    if (isPending) return;
                    setOpenDialog(false);
                }}>
                <DialogTitle>Add New User</DialogTitle>
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
                                label="Username"
                                variant="filled"
                                {...register("username")}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                                sx={{ marginBottom: "10px" }}
                                disabled={isPending}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                label="Email"
                                variant="filled"
                                {...register("email")}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                sx={{ marginBottom: "10px" }}
                                disabled={isPending}
                            />
                            <TextField
                                fullWidth
                                size="small"
                                label="Password"
                                variant="filled"
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                sx={{ marginBottom: "10px" }}
                                disabled={isPending}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    setShowPassword(
                                                        (prev) => !prev
                                                    )
                                                }
                                                edge="end"
                                                disabled={isPending}>
                                                {showPassword ? (
                                                    <VisibilityOff />
                                                ) : (
                                                    <Visibility />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
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
