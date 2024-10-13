import { Box, Typography, CircularProgress } from "@mui/material";

export default function InitialLoad() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundColor: "#f0f0f0",
                padding: "20px",
            }}>
            <Typography
                variant="h5"
                sx={{ marginBottom: "20px", color: "#333", fontSize: "18px" }}>
                Loading...
            </Typography>
            <CircularProgress color="primary" />
        </Box>
    );
}
