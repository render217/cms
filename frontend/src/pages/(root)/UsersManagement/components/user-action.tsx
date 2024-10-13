import { IUser } from "@/types";
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    IconButton,
    CircularProgress,
    Stack,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import UserService from "@/services/user.services";
import { Can } from "@/context/ability-context";
export default function UserAction({ user }: { user: IUser }) {
    return (
        <>
            <Stack direction="row" spacing={2}>
                <DeleteUser user={user} />
            </Stack>
        </>
    );
}

export function DeleteUser({ user }: { user: IUser }) {
    const [openDialog, setOpenDialog] = useState(false);
    const { mutate, isPending } = UserService.deleteUser.useMutation();

    const handleOk = () => {
        if (isPending) return;
        mutate(user.id, {
            onSuccess: () => {
                setOpenDialog(false);
            },
        });
    };
    const handleCancel = () => {
        if (isPending) return;
        setOpenDialog(false);
    };
    return (
        <>
            <Can I="delete" a="User">
                <IconButton size="small" onClick={() => setOpenDialog(true)}>
                    <DeleteIcon
                        sx={{
                            fontSize: "21px",
                            cursor: "pointer",
                            color: "#FF0000",
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
