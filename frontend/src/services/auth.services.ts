import { UseMutationOptions, useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IUser } from "@/types";
import apiClient from "./apiClient";
// import { toast } from "react-toastify";

interface LoginFormType {
    email: string;
    password: string;
}
interface LoginResponse {
    user: IUser;
    token: string;
}

export async function login(
    payload: LoginFormType
): Promise<SuccessType<LoginResponse>> {
    return (await apiClient.post("/auth/login", payload)).data;
}

const AuthService = {
    Login: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                LoginFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => login(data),
                // onSuccess: (response) => {
                //     // toast.success(response.message);
                // },
                // onError: (error) => {
                //     // toast.error(error.response?.data.message);

                // },
            }),
    },
};

export default AuthService;
