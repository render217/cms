import { useAuth } from "@/context/auth-context";
import AuthService from "@/services/auth.services";
import { COOKIE_TOKEN } from "@/utils/constants";
import { isAxiosError } from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    TextField,
    Typography,
    Paper,
    CircularProgress,
} from "@mui/material";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignIn() {
    const navigate = useNavigate();
    const location = useLocation();
    const { setUser, setIsAuthenticated } = useAuth();

    const from = location.state?.from?.pathname || "/";

    const { mutateAsync, isPending } = AuthService.Login.useMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    });

    const onSubmit = async (data: SignInFormData) => {
        try {
            const response = await mutateAsync(data);
            setUser(response.payload.user);
            setIsAuthenticated(true);
            toast.success(response.message);
            Cookies.set(COOKIE_TOKEN, response.payload.token);
            navigate(from, { replace: true });
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                toast.error(error?.response?.data?.message);
            }
        }
    };

    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
            bgcolor="#f5f5f5">
            <Paper elevation={3} sx={{ padding: 3, width: "400px" }}>
                <Typography
                    sx={{ fontSize: "24px" }}
                    variant="h6"
                    align="center"
                    gutterBottom>
                    Sign In
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Email"
                            variant="outlined"
                            error={!!errors.email}
                            helperText={
                                errors.email ? errors.email.message : ""
                            }
                            {...register("email")}
                        />
                    </Box>
                    <Box mb={2}>
                        <TextField
                            fullWidth
                            size="small"
                            label="Password"
                            type="password"
                            variant="outlined"
                            error={!!errors.password}
                            helperText={
                                errors.password ? errors.password.message : ""
                            }
                            {...register("password")}
                        />
                    </Box>
                    <Box>
                        <Button
                            disabled={isPending}
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth>
                            {isPending ? (
                                <CircularProgress color="inherit" size={24} />
                            ) : (
                                "Sign In"
                            )}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Box>
    );
}
