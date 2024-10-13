import { ProjectType } from "@/types";
import { Typography } from "@mui/material";

// Function to map ProjectType to colors
const getProjectTypeStyles = (type: ProjectType) => {
    switch (type) {
        case "FRONTEND":
            return { backgroundColor: "#FF5722", color: "#fff" }; // Green background with white text
        case "BACKEND":
            return { backgroundColor: "#171B36", color: "#fff" }; // Orange background with white text
        default:
            return { backgroundColor: "#E0E0E0", color: "#000" }; // Default grey background
    }
};

export function ProjectTypeDisplay({ type }: { type: ProjectType }) {
    const styles = getProjectTypeStyles(type);

    return (
        <Typography
            sx={{
                width: "100px",
                textAlign: "center",
                fontSize: "12px",
                padding: "4px 8px",
                borderRadius: "12px",
                display: "inline-block",
                fontWeight: "",
                ...styles,
            }}>
            {type}
        </Typography>
    );
}
