import AuthLayout from "@/layout/auth-layout";
import RootLayout from "@/layout/root-layout";
import { SignIn } from "@/pages/(auth)";
import NotFound from "@/pages/(root)/NotFound";
import Profile from "@/pages/(root)/Profile";
import Resources from "@/pages/(root)/Resources";
import UsersManagment from "@/pages/(root)/UsersManagement";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import ProtectedRouteAbility from "./protect-ability-route";

export default function AllRoutes() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<AuthLayout />}>
                        <Route path="sign-in" element={<SignIn />} />
                    </Route>
                    <Route element={<ProtectedRoute />}>
                        <Route element={<RootLayout />}>
                            <Route index element={<Resources />} />
                            <Route path="resources" element={<Resources />} />
                            <Route path="profile" element={<Profile />} />
                            <Route
                                path="users"
                                element={
                                    <ProtectedRouteAbility
                                        subject={["User", "Permission"]}
                                        fallbackRoute="/not-found">
                                        <UsersManagment />
                                    </ProtectedRouteAbility>
                                }
                            />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}
