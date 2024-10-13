import {
    Box,
    Typography,
    Divider,
    Stack,
    Card,
    CardContent,
    TextField,
    CircularProgress,
    Button,
    IconButton,
    Grid2,
    InputAdornment,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useAuth } from "@/context/auth-context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/user.services";

const passwordSchema = z.object({
    oldPassword: z.string().min(1, "Old Password is required"),
    newPassword: z
        .string()
        .min(6, "New Password must be at least 6 characters long"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function Profile() {
    const { user } = useAuth();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<PasswordFormValues>({
        mode: "onChange",
        resolver: zodResolver(passwordSchema),
    });

    const { isPending, mutate } = UserService.updateUser.useMutation();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const handleClickShowOldPassword = () =>
        setShowOldPassword((prev) => !prev);
    const handleClickShowNewPassword = () =>
        setShowNewPassword((prev) => !prev);

    const onSubmit = (values: PasswordFormValues) => {
        mutate(
            {
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
            },
            {
                onSuccess: () => {
                    reset();
                },
            }
        );
    };

    const statusStyles = {
        ACTIVE: {
            color: "green",
            backgroundColor: "#d0f0c0",
        },
        DISABLED: {
            color: "red",
            backgroundColor: "#f8d7da",
        },
    };

    return (
        <Box
            sx={{
                p: "20px",
                maxWidth: "900px",
                margin: "auto",
            }}>
            <Grid2 container spacing={3}>
                {/* User Profile Card */}
                <Grid2
                    size={{
                        xs: 12,
                        md: 6,
                    }}>
                    <Card
                        sx={{
                            height: "100%",
                        }}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: "10px",
                                    fontWeight: "bold",
                                }}>
                                Your Info
                            </Typography>
                            <Divider sx={{ marginBottom: "20px" }} />

                            <Stack spacing={2}>
                                <Typography variant="body1">
                                    <strong>Username:</strong> {user.username}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Email:</strong> {user.email}
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Status:</strong>{" "}
                                    <span
                                        style={{
                                            color: statusStyles[user.status]
                                                .color,
                                            backgroundColor:
                                                statusStyles[user.status]
                                                    .backgroundColor,
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontWeight: "bold",
                                        }}>
                                        {user.status}
                                    </span>
                                </Typography>
                                <Typography variant="body1">
                                    <strong>Account Created At:</strong>{" "}
                                    {new Date(user.createdAt).toLocaleString()}
                                </Typography>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid2>

                {/* Password Change Form */}
                <Grid2
                    size={{
                        xs: 12,
                        md: 6,
                    }}>
                    <Card>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{
                                    marginBottom: "10px",
                                }}>
                                Change Password
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Stack spacing={2}>
                                    {/* Old Password Field */}
                                    <TextField
                                        label="Old Password"
                                        type={
                                            showOldPassword
                                                ? "text"
                                                : "password"
                                        }
                                        variant="filled"
                                        fullWidth
                                        {...register("oldPassword")}
                                        error={!!errors.oldPassword}
                                        helperText={errors.oldPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={
                                                            handleClickShowOldPassword
                                                        }
                                                        edge="end">
                                                        {showOldPassword ? (
                                                            <VisibilityOff />
                                                        ) : (
                                                            <Visibility />
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {/* New Password Field */}
                                    <TextField
                                        label="New Password"
                                        type={
                                            showNewPassword
                                                ? "text"
                                                : "password"
                                        }
                                        variant="filled"
                                        fullWidth
                                        {...register("newPassword")}
                                        error={!!errors.newPassword}
                                        helperText={errors.newPassword?.message}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={
                                                            handleClickShowNewPassword
                                                        }
                                                        edge="end">
                                                        {showNewPassword ? (
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
                                        disabled={isPending || !isValid}
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
                                                size={24}
                                            />
                                        ) : (
                                            " Change Password"
                                        )}
                                    </Button>
                                </Stack>
                            </form>
                        </CardContent>
                    </Card>
                </Grid2>
            </Grid2>
        </Box>
    );
}
