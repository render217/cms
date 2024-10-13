import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

import ArticleService from "@/services/article.services";
import { useState } from "react";
import ArticleForm from "./article-form";
import { Can } from "@/context/ability-context";

export default function CreateArticle() {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate, isPending } = ArticleService.createArticle.useMutation();
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
            <Can I="create" a="Article">
                <Button
                    onClick={() => {
                        setOpenDialog(true);
                    }}
                    sx={{
                        backgroundColor: "#171B36",
                    }}
                    variant={"contained"}>
                    Add Article
                </Button>
            </Can>
            <Dialog
                open={openDialog}
                onClose={() => {
                    if (isPending) return;
                    setOpenDialog(false);
                }}>
                <DialogTitle>Add New Article</DialogTitle>
                <DialogContent>
                    <ArticleForm
                        onSubmit={onFormSubmission}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
