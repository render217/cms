import { IArticle } from "@/types";
import { CircularProgress, DialogContent, Stack } from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import ArticleService from "@/services/article.services";
import ArticleForm from "./article-form";
import { Can } from "@/context/ability-context";

export default function ArticleAction({ article }: { article: IArticle }) {
    return (
        <>
            <Stack direction="row" spacing={2}>
                <EditArticle article={article} />
                <DeleteArticle article={article} />
            </Stack>
        </>
    );
}

function EditArticle({ article }: { article: IArticle }) {
    const [openDialog, setOpenDialog] = useState(false);

    const { mutate, isPending } = ArticleService.updateArticle.useMutation(
        article.id
    );

    const onFormSubmission = async (values: {
        title: string;
        content: string;
    }) => {
        mutate(
            {
                title: values.title,
                content: values.content,
            },
            {
                onSuccess: () => {
                    setOpenDialog(false);
                },
            }
        );
    };

    return (
        <>
            <Can I="update" a="Article">
                <IconButton size="small" onClick={() => setOpenDialog(true)}>
                    <EditIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                        }}
                    />
                </IconButton>
            </Can>
            <Dialog
                open={openDialog}
                onClose={() => {
                    if (isPending) return;
                    setOpenDialog(false);
                }}>
                <DialogTitle>Edit Article</DialogTitle>
                <DialogContent>
                    <ArticleForm
                        initialData={{
                            title: article.title,
                            content: article.content,
                        }}
                        onSubmit={onFormSubmission}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
function DeleteArticle({ article }: { article: IArticle }) {
    const [open, setOpen] = useState(false);

    const { mutate, isPending } = ArticleService.deleteArticle.useMutation();

    const handleOk = () => {
        if (isPending) return;
        mutate(article.id, {
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
            <Can I="delete" a="Article">
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
