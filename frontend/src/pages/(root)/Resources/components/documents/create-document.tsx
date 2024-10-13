import { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import DocumentService from "@/services/document.service";
import { DocumentForm, DocumentFormType } from "./document-form";
import { Can } from "@/context/ability-context";

export default function CreateDocument() {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate, isPending } = DocumentService.createDocument.useMutation();

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
            <Can I="create" a="Document">
                <Button
                    onClick={() => setOpenDialog(true)}
                    sx={{ backgroundColor: "#171B36" }}
                    variant="contained">
                    Add Document
                </Button>
            </Can>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Add New Document</DialogTitle>
                <DialogContent>
                    <DocumentForm
                        onSubmit={handleFormSubmit}
                        isPending={isPending}
                    />
                </DialogContent>
            </Dialog>
        </>
    );
}
