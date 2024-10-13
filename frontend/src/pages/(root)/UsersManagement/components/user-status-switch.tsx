import { IUser, UserStatus } from "@/types";

import { Box, Switch, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import UserService from "@/services/user.services";
import { Can } from "@/context/ability-context";

export default function UserStatusSwitch({ user }: { user: IUser }) {
    const isActive = user.status === UserStatus.ACTIVE;

    const { mutate, isPending } = UserService.updateUserStatus.useMutation(
        user.id
    );

    const handleToggle = () => {
        if (isPending) return;
        mutate();
    };

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "2px",
                    backgroundColor: isActive ? "#DAF2DA" : "#FFCCD9",
                    borderRadius: "10px",
                }}>
                {isActive ? (
                    <CheckIcon sx={{ color: "#008000", fontSize: "18px" }} />
                ) : (
                    <ClearIcon sx={{ color: "#FF003F", fontSize: "18px" }} />
                )}

                <Typography
                    sx={{
                        minWidth: "58px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: isActive ? "#008000" : "#FF003F",
                    }}>
                    {isActive ? "Active" : "Disabled"}
                </Typography>
                <Can I="manage" a="User" passThrough>
                    {(allowed) => (
                        <Switch
                            disabled={isPending || !allowed}
                            checked={isActive}
                            onChange={handleToggle}
                            color={isActive ? "success" : "warning"}
                            size="small"
                            inputProps={{ "aria-label": "controlled" }}
                        />
                    )}
                </Can>
            </Box>
        </>
    );
}
