import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IUser } from "@/types";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import queryClient from "./queryClient";

type CreateUserFormType = {
    username: string;
    email: string;
    password: string;
};
type UpdateUserFormType = {
    oldPassword: string;
    newPassword: string;
};

type UserResponse = IUser;
type ParamId = string;
async function getMe() {
    return (await apiClient.get("/users/me")).data;
}
async function createUser(payload: CreateUserFormType) {
    return (await apiClient.post("/users", payload)).data;
}
async function getUsers() {
    return (await apiClient.get("/users")).data;
}
async function getUserById(id: unknown) {
    return (await apiClient.get(`/users/${id}`)).data;
}
async function updateUser(payload: UpdateUserFormType) {
    return (await apiClient.patch(`/users`, payload)).data;
}
async function updateUserStatus(id: string) {
    return (await apiClient.patch(`/users/${id}/update-status`)).data;
}
async function deleteUser(id: unknown) {
    return (await apiClient.delete(`/users/${id}`)).data;
}

const UserService = {
    getMe: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<UserResponse>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["currentUser"],
                queryFn: () => getMe(),
                retry: false,
                ...options,
            }),
    },
    getUsers: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<UserResponse[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["users"],
                queryFn: () => getUsers(),
                ...options,
            }),
    },
    getUser: {
        useQuery: (
            id: string,
            options?: UseQueryOptions<
                SuccessType<UserResponse>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["users", { id }],
                queryFn: () => getUserById(id),
                enabled: !!id,
                ...options,
            }),
    },
    createUser: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                CreateUserFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => createUser(data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    updateUser: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                UpdateUserFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => updateUser(data),
                onSuccess: (response) => {
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                    queryClient.invalidateQueries({
                        queryKey: ["currentUser"],
                    });
                    toast.success(
                        response.message || "successfully updated  password"
                    );
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    deleteUser: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                ParamId
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (id) => deleteUser(id),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    updateUserStatus: {
        useMutation: (
            id: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: () => updateUserStatus(id),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["users"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
};

export default UserService;
