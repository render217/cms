import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";
import useUIStore from "@/store/useUIStore";
import { useAuth } from "@/context/auth-context";

export default function NavBar() {
    const { user } = useAuth();
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const possible_paths = ["", "resources", "profile", "users", "experiment"];
    const isValid = possible_paths.includes(path);
    const pathName = isValid
        ? path === ""
            ? "resources"
            : path === "users"
            ? "user Managment"
            : path
        : "";
    const pathNameText = pathName.charAt(0).toUpperCase() + pathName.slice(1);

    const { setCollapsed, collapsed } = useUIStore();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                backgroundColor: "white",
                padding: "10px",
                boxShadow: "10px",
                position: "relative",
            }}>
            {/* {!isMinScreen && (
                <IconButton onClick={() => setCollapsed(!collapsed)}>
                    <MenuOutlinedIcon />
                </IconButton>
            )}
            {isMinScreen && (
                <IconButton onClick={() => setToggled(!toggled)}>
                    <MenuOutlinedIcon />
                </IconButton>
            )} */}
            <IconButton onClick={() => setCollapsed(!collapsed)}>
                <MenuOutlinedIcon />
            </IconButton>
            <Typography>{pathNameText}</Typography>
            {/* Alert Message for First Login */}
            {user.isFirstLogin && (
                <Typography
                    sx={{
                        position: "absolute",
                        right: 0,
                        backgroundColor: "#ffcccc",
                        color: "#d50000",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        fontWeight: "bold",
                    }}>
                    Reset your password!
                </Typography>
            )}
        </Box>
    );
}
