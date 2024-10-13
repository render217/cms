import { IDocument } from "@/types";
import { CircularProgress, DialogContent, Stack } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from "@mui/material";
import DocumentService from "@/services/document.service";
import { DocumentForm, DocumentFormType } from "./document-form";
import { Can } from "@/context/ability-context";
export default function DocumentActions({ document }: { document: IDocument }) {
    return (
        <Stack direction="row" spacing={2}>
            <EditDocument document={document} />
            <DeleteDocument document={document} />
        </Stack>
    );
}

export function EditDocument({ document }: { document: IDocument }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate, isPending } = DocumentService.updateDocument.useMutation(
        document.id
    );

    const handleFormSubmit = (values: DocumentFormType) => {
        mutate(
            { title: values.title, type: values.type },
            {
                onSuccess: () => {
                    setOpenDialog(false);
                },
            }
        );
    };

    return (
        <>
            <Can I="update" a="Document">
                <IconButton size="small" onClick={() => setOpenDialog(true)}>
                    <EditIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                        }}
                    />
                </IconButton>
            </Can>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Edit Document</DialogTitle>
                <DialogContent>
                    <DocumentForm
                        defaultValues={{
                            title: document.title,
                            type: document.type,
                        }}
                        onSubmit={handleFormSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
function DeleteDocument({ document }: { document: IDocument }) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = DocumentService.deleteDocument.useMutation();

    const handleOk = () => {
        if (isPending) return;
        mutate(document.id, {
            onSuccess: () => {
                setOpen(false);
            },
        });
    };
    const handleCancel = () => {
        if (isPending) return;
        setOpen(false);
    };

    return (
        <>
            <Can I="delete" a="Document">
                <IconButton size="small" onClick={() => setOpen(true)}>
                    <DeleteIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                            color: "#FF0000",
                        }}
                    />
                </IconButton>
            </Can>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Are you sure you want to delete</DialogTitle>

                <DialogActions>
                    <Button
                        disabled={isPending}
                        variant={"outlined"}
                        size="small"
                        sx={{
                            padding: "8px",
                        }}
                        color="warning"
                        autoFocus
                        onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button
                        disabled={isPending}
                        size="small"
                        sx={{
                            padding: "8px",
                        }}
                        variant={"outlined"}
                        onClick={handleOk}>
                        {isPending ? (
                            <CircularProgress color="inherit" size={16} />
                        ) : (
                            "Ok"
                        )}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
