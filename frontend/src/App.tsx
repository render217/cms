import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "@/layout/auth-layout";
import RootLayout from "@/layout/root-layout";
import { SignIn, SignUp } from "./pages/(auth)";
import Resources from "./pages/(root)/Resources";
import Profile from "./pages/(root)/Profile";
import UsersManagment from "./pages/(root)/UsersManagement";
import Experiment from "./pages/(root)/Experiment";
import NotFound from "./pages/(root)/NotFound";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayout />}>
                    <Route path="sign-in" element={<SignIn />} />
                    <Route path="sign-up" element={<SignUp />} />
                </Route>
                <Route element={<RootLayout />}>
                    <Route index element={<Resources />} />
                    <Route path="resources" element={<Resources />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="users" element={<UsersManagment />} />
                    <Route path="experiment" element={<Experiment />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
