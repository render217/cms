import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useLocation } from "react-router-dom";
import useUIStore from "@/store/useUIStore";
export default function NavBar() {
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

    const {
        // toggled, setToggled,
        setCollapsed,
        collapsed,
    } = useUIStore();
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
            }}>
            <IconButton onClick={() => setCollapsed(!collapsed)}>
                <MenuOutlinedIcon />
            </IconButton>
            {/* <IconButton onClick={() => setToggled(!toggled)}>
                <MenuOutlinedIcon />
            </IconButton> */}
            <Typography>{pathNameText}</Typography>
        </Box>
    );
}
