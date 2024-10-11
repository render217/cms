import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
export default function RootLayout() {
    return (
        <>
            {/* Wrapper */}
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    overflow: "hidden",
                }}>
                {/* SideBar */}
                <SideBar />

                {/* Main Content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        p: "10px",
                        backgroundColor: "#f0f2ff",
                        height: "100%",
                        overflowY: "auto",
                    }}>
                    <NavBar />
                    <Box
                        sx={{
                            mt: "10px",
                            backgroundColor: "white",
                        }}>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
}
