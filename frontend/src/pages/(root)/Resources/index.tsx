import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useState } from "react";
import Projects from "./components/projects";
import Articles from "./components/articles";
import Documents from "./components/documents";
import { useAppAbility } from "@/context/ability-context";
export default function Resources() {
    const ability = useAppAbility();
    const canViewUsers = ability.can("read", "User");
    const canViewArticles = ability.can("read", "Article");
    const canViewDocuments = ability.can("read", "Document");

    const initialValue = () => {
        if (canViewUsers) return "1";
        if (canViewArticles) return "2";
        if (canViewDocuments) return "3";
        return "1";
    };

    const [value, setValue] = useState(initialValue);

    if (!canViewUsers && !canViewArticles && !canViewDocuments) {
        return null;
    }

    const handleTabChange = (
        _event: React.SyntheticEvent,
        newValue: string
    ) => {
        setValue(newValue);
    };
    return (
        <Box
            sx={{
                p: "5px",
            }}>
            <Box
                sx={{
                    width: "100%",
                }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                        <TabList
                            aria-label="resource-tabs"
                            onChange={handleTabChange}>
                            {canViewUsers && <Tab label="Projects" value="1" />}
                            {canViewArticles && (
                                <Tab label="Articles" value="2" />
                            )}
                            {canViewDocuments && (
                                <Tab label="Documents" value="3" />
                            )}
                        </TabList>
                    </Box>
                    {canViewUsers && (
                        <TabPanel value="1">
                            <Projects />
                        </TabPanel>
                    )}
                    {canViewArticles && (
                        <TabPanel value="2">
                            <Articles />
                        </TabPanel>
                    )}
                    {canViewDocuments && (
                        <TabPanel value="3">
                            <Documents />
                        </TabPanel>
                    )}
                </TabContext>
            </Box>
        </Box>
    );
}
