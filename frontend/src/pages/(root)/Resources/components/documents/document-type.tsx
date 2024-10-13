import { DocumentType } from "@/types";
import { Typography } from "@mui/material";

const getTypeStyles = (type: DocumentType) => {
    switch (type) {
        case "CONFIDENTIAL":
            return { backgroundColor: "#FFC107", color: "#000" }; // Amber background with black text
        case "INTERNAL":
            return { backgroundColor: "#4CAF50", color: "#fff" }; // Medium green background with white text
        case "SECRET":
            return { backgroundColor: "#F44336", color: "#fff" }; // Bright red background with white text
        case "PUBLIC":
            return { backgroundColor: "#2196F3", color: "#fff" }; // Bright blue background with white text
        default:
            return { backgroundColor: "#BDBDBD", color: "#000" };
    }
};

export function DocumentTypeDisplay({ type }: { type: DocumentType }) {
    const styles = getTypeStyles(type);

    return (
        <Typography
            sx={{
                width: "130px",
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
