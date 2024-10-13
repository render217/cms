import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IArticle } from "@/types";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import queryClient from "./queryClient";

type CreateArticleFormType = {
    title: string;
    content: string;
};
type UpdateArticleFormType = {
    title?: string;
    content?: string;
};
type ParamId = string;
async function createArticle(payload: CreateArticleFormType) {
    return (await apiClient.post("/articles", payload)).data;
}
async function getArticles() {
    return (await apiClient.get("/articles")).data;
}
async function getUserById(id: string) {
    return (await apiClient.get(`/articles/${id}`)).data;
}
async function updateUser(id: string, payload: UpdateArticleFormType) {
    return (await apiClient.patch(`/articles/${id}`, payload)).data;
}

async function deleteUser(id: string) {
    return (await apiClient.delete(`/articles/${id}`)).data;
}

const ArticleService = {
    getArticles: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<IArticle[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["articles"],
                queryFn: () => getArticles(),
                ...options,
            }),
    },
    getArticle: {
        useQuery: (
            id: string,
            options?: UseQueryOptions<
                SuccessType<IArticle>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["articles", { id }],
                queryFn: () => getUserById(id),
                enabled: !!id,
                ...options,
            }),
    },
    createArticle: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                CreateArticleFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => createArticle(data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["articles"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    updateArticle: {
        useMutation: (
            id: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                UpdateArticleFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => updateUser(id, data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["articles"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    deleteArticle: {
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
                    queryClient.invalidateQueries({ queryKey: ["articles"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
};

export default ArticleService;
