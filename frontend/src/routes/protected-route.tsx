import { useAuth } from "@/context/auth-context";
import InitialLoad from "@/pages/(root)/InitalLoad";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <InitialLoad />;
    }

    if (!isAuthenticated) {
        return <Navigate to={"/sign-in"} state={{ from: location }} replace />;
    }

    return <Outlet />;
}
