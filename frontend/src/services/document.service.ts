import {
    UseMutationOptions,
    UseQueryOptions,
    useMutation,
    useQuery,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { ErrorType, SuccessType } from "@/types/axios.type";
import { IDocument } from "@/types";
import apiClient from "./apiClient";
import { toast } from "react-toastify";
import queryClient from "./queryClient";

type CreateDocumentFormType = {
    title: string;
    type: string;
};
type UpdateDocumentFormType = {
    title?: string;
    type?: string;
};
type ParamId = string;

async function createDocument(payload: CreateDocumentFormType) {
    return (await apiClient.post("/documents", payload)).data;
}
async function getDocuments() {
    return (await apiClient.get("/documents")).data;
}
async function getDocumentById(id: string) {
    return (await apiClient.get(`/documents/${id}`)).data;
}
async function updateDocument(id: string, payload: UpdateDocumentFormType) {
    return (await apiClient.patch(`/documents/${id}`, payload)).data;
}

async function deleteDocument(id: string) {
    return (await apiClient.delete(`/documents/${id}`)).data;
}

const DocumentService = {
    getDocuments: {
        useQuery: (
            options?: UseQueryOptions<
                SuccessType<IDocument[]>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["documents"],
                queryFn: () => getDocuments(),
                ...options,
            }),
    },
    getDocument: {
        useQuery: (
            id: string,
            options?: UseQueryOptions<
                SuccessType<IDocument>,
                AxiosError<ErrorType>
            >
        ) =>
            useQuery({
                queryKey: ["documents", { id }],
                queryFn: () => getDocumentById(id),
                enabled: !!id,
                ...options,
            }),
    },
    createDocument: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                CreateDocumentFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => createDocument(data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["documents"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    updateDocument: {
        useMutation: (
            id: string,
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                UpdateDocumentFormType
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (data) => updateDocument(id, data),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["documents"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
    deleteDocument: {
        useMutation: (
            options?: UseMutationOptions<
                SuccessType<unknown>,
                AxiosError<ErrorType>,
                ParamId
            >
        ) =>
            useMutation({
                ...options,
                mutationFn: (id) => deleteDocument(id),
                onSuccess: (response) => {
                    toast.success(response.message);
                    queryClient.invalidateQueries({ queryKey: ["documents"] });
                },
                onError: (error) => {
                    toast.error(error.response?.data.message);
                },
            }),
    },
};

export default DocumentService;
