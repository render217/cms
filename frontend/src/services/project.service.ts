import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IProject } from "@/types";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import queryClient from "./queryClient";

type CreateProjectFormType = {
    name: string;
    description: string;
    type: string;
};
type UpdateProjectFormType = {
    name?: string;
    description?: string;
    type?: string;
};
type ParamId = string;
async function createProject(payload: CreateProjectFormType) {
    return (await apiClient.post("/projects", payload)).data;
}
async function getProjects() {
    return (await apiClient.get("/projects")).data;
}
async function getProject(id: string) {
    return (await apiClient.get(`/projects/${id}`)).data;
}
async function updateProject(id: string, payload: UpdateProjectFormType) {
    return (await apiClient.patch(`/projects/${id}`, payload)).data;
}

async function deleteProject(id: string) {
    return (await apiClient.delete(`/projects/${id}`)).data;
}

const ProjectService = {
    getProjects: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<IProject[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["projects"],
                queryFn: () => getProjects(),
                ...options,
            }),
    },
    getProject: {
        useQuery: (
            id: string,
            options?: UseQueryOptions<
                SuccessType<IProject>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["projects", { id }],
                queryFn: () => getProject(id),
                enabled: !!id,
                ...options,
            }),
    },
    createDocument: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                CreateProjectFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => createProject(data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["projects"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    updateProject: {
        useMutation: (
            id: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                UpdateProjectFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => updateProject(id, data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["projects"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    deleteProject: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                ParamId
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (id) => deleteProject(id),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["projects"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
};

export default ProjectService;
