import InitialLoad from "@/pages/(root)/InitalLoad";
import UserService from "@/services/user.services";
import { IUser } from "@/types";
import { COOKIE_TOKEN } from "@/utils/constants";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const INTIAL_USER: IUser = {
    id: "",
    username: "",
    email: "",
    status: "DISABLED",
    isFirstLogin: false,
    createdAt: "",
    updatedAt: "",
};

const INTIAL_STATE = {
    user: INTIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    logOutUser: () => {},
};

type IContextType = {
    user: IUser;
    isLoading: boolean;
    isAuthenticated: boolean;
    setUser: (user: IUser) => void;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
    logOutUser: () => void;
};

const AuthContext = createContext<IContextType>(INTIAL_STATE);
export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<IUser>(INTIAL_USER);
    const [localLoading, setLocalLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { data, isFetching, isLoading } = UserService.getMe.useQuery();

    useEffect(() => {
        if (!isFetching) {
            if (data?.payload) {
                setUser(data?.payload);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }

            setLocalLoading(false);
        }
    }, [isFetching, data?.payload]);

    const logOutUser = () => {
        setUser(INTIAL_USER);
        setIsAuthenticated(false);
        Cookies.remove(COOKIE_TOKEN);
    };

    const value = {
        user,
        isLoading: localLoading || isLoading,
        isAuthenticated,
        setUser,
        setIsAuthenticated,
        logOutUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <InitialLoad /> : children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
