import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./routes";
import AuthProvider from "./context/auth-context";
import { ToastContainer } from "react-toastify";
import queryClient from "./services/queryClient";
import AbilityProvider from "./context/ability-context";

export default function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <AbilityProvider>
                        <AllRoutes />
                        <ToastProvider />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </AbilityProvider>
                </AuthProvider>
            </QueryClientProvider>
        </>
    );
}

function ToastProvider() {
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
            />
        </>
    );
}
