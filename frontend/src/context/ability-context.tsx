import { createContextualCan } from "@casl/react";

import { useState, useEffect, useContext } from "react";

import { useAuth } from "./auth-context";
import { AppAbility, defineAbilityFor } from "@/config/ability";

import { createContext } from "react";

export const AbilityContext = createContext<AppAbility>(
    null as unknown as AppAbility
);
function AbilityProvider({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const [ability, setAbility] = useState(defineAbilityFor(user.permissions!));
    useEffect(() => {
        if (user && user.permissions) {
            setAbility(defineAbilityFor(user.permissions));
        }
    }, [user]);

    return (
        <AbilityContext.Provider value={ability}>
            {children}
        </AbilityContext.Provider>
    );
}

export default AbilityProvider;

export const Can = createContextualCan(AbilityContext.Consumer);
export const useAppAbility = () => {
    const context = useContext(AbilityContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};
