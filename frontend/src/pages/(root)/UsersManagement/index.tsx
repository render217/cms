import { Box } from "@mui/material";
import CreateUser from "./components/create-user";
import UserTable from "./components/user-table";
export default function UsersManagment() {
    return (
        <Box
            sx={{
                p: "20px",
            }}>
            <CreateUser />
            <UserTable />
        </Box>
    );
}
