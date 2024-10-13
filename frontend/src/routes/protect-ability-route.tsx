import { Navigate } from "react-router-dom";

import { AppSubjects } from "@/config/ability";
import { useAppAbility } from "@/context/ability-context";

type ProtectedRouteAbilityProps = {
    subject: AppSubjects[];
    fallbackRoute?: string;
    children: React.ReactNode;
};

export default function ProtectedRouteAbility({
    subject,
    fallbackRoute,
    children,
}: ProtectedRouteAbilityProps) {
    const ability = useAppAbility();

    if (!subject.some((sub) => ability.can("read", sub))) {
        if (fallbackRoute) {
            return <Navigate to={fallbackRoute} replace />;
        }
        return <Navigate to={"/not-found"} replace />;
    }

    return <>{children}</>;
}
