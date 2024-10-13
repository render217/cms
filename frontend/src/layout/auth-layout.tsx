import useAuthRedirect from "@/hooks/use-auth-redirect";
import { Outlet } from "react-router-dom";
export default function AuthLayout() {
    useAuthRedirect();
    return (
        <div>
            <Outlet />
        </div>
    );
}
