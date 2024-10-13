import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import { Divider, Typography } from "@mui/material";
import useUIStore from "@/store/useUIStore";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { Can } from "@/context/ability-context";
export default function SideBar() {
    const { toggled, collapsed, setToggled } = useUIStore();
    const { logOutUser } = useAuth();
    const location = useLocation();
    const [activeMenuItem, setActiveMenuItem] = useState(location.pathname);
    const handleMenuItemClick = (path: string) => {
        setActiveMenuItem(path);
        setToggled(false);
    };

    const handleLogout = () => {
        logOutUser();
    };

    return (
        <Sidebar
            toggled={toggled}
            collapsed={collapsed}
            // breakPoint="xs"
            onBackdropClick={() => setToggled(false)}
            style={{
                height: "100vh",
                borderRightColor: "rgba(0,0,0,0.1)",
                position: "relative",
            }}
            transitionDuration={800}>
            <Menu
                rootStyles={{
                    display: "flex",
                    width: "100%",
                    flexDirection: "column",
                }}
                menuItemStyles={{
                    button: ({ level, active, disabled }) => {
                        if (level === 0)
                            return {
                                color: disabled
                                    ? "#171B36"
                                    : active
                                    ? "white"
                                    : "#171B36",
                                backgroundColor: active
                                    ? "#171B36"
                                    : "transparent",
                                "&:hover": {
                                    backgroundColor: "#171B36",
                                    color: "white",
                                },
                            };
                    },
                }}>
                <MenuItem
                    style={{
                        paddingBlock: "40px",
                        backgroundColor: "#171B36",
                        color: "white",
                    }}>
                    <Typography
                        variant="h5"
                        component={"h2"}
                        sx={{
                            textAlign: "center",
                        }}>
                        CMS
                    </Typography>
                </MenuItem>
                <Divider
                    sx={{
                        marginBottom: "25px",
                    }}
                />
                <Can I="manage" a="User">
                    <MenuItem
                        active={activeMenuItem === "/users"}
                        component={<Link to="/users" />}
                        icon={<PeopleOutlinedIcon />}
                        onClick={() => handleMenuItemClick("/users")}>
                        <Typography>User Managment</Typography>
                    </MenuItem>
                </Can>
                <MenuItem
                    active={activeMenuItem === "/"}
                    icon={<FolderOutlinedIcon />}
                    component={<Link to="/" />}
                    onClick={() => handleMenuItemClick("/")}>
                    <Typography>Resources</Typography>
                </MenuItem>

                <MenuItem
                    active={activeMenuItem === "/profile"}
                    icon={<PersonOutlinedIcon />}
                    component={<Link to={"/profile"}></Link>}
                    onClick={() => handleMenuItemClick("/profile")}>
                    <Typography>Profile</Typography>
                </MenuItem>

                <MenuItem
                    onClick={handleLogout}
                    rootStyles={{
                        position: "absolute",
                        bottom: "20px",
                        left: "0",
                        right: "0",
                    }}
                    icon={<LogoutOutlinedIcon />}>
                    <Typography>Log out</Typography>
                </MenuItem>
            </Menu>
        </Sidebar>
    );
}
