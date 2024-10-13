import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IGroupedPermission, IUserPermission } from "@/types";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import queryClient from "./queryClient";

type AssignPermissionPayload = {
    permissionIds: string[];
};
type UpdatePermissionPayload = AssignPermissionPayload;

async function getPermissions() {
    return (await apiClient.get("/permissions")).data;
}
async function getUserPermission(userId: string) {
    return (await apiClient.get(`/permissions/user/${userId}`)).data;
}
async function assignPermission(
    userId: string,
    payload: AssignPermissionPayload
) {
    return (await apiClient.post(`/permissions/user/${userId}/assign`, payload))
        .data;
}
async function revokePermission(
    userId: string,
    payload: UpdatePermissionPayload
) {
    return (await apiClient.post(`/permissions/user/${userId}/revoke`, payload))
        .data;
}

const PermissionService = {
    getPermissions: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<IGroupedPermission[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["permissions"],
                queryFn: () => getPermissions(),
                ...options,
            }),
    },
    getUserPermission: {
        useQuery: (
            id: string,
            options?: UseQueryOptions<
                SuccessType<IUserPermission[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["permissions", { id }],
                queryFn: () => getUserPermission(id),
                enabled: !!id,
                ...options,
            }),
    },
    assignPermission: {
        useMutation: (
            userId: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                AssignPermissionPayload
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => assignPermission(userId, data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({
                        queryKey: ["permissions"],
                    });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    revokePermission: {
        useMutation: (
            userId: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                UpdatePermissionPayload
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => revokePermission(userId, data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({
                        queryKey: ["permissions"],
                    });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
};

export default PermissionService;
