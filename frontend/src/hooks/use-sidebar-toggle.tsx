import useUIStore from "@/store/useUIStore";
import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";

export default function useSideBarToggle() {
    const isSm = useMediaQuery("(max-width:1024px)");
    const { setToggled, setCollapsed, setMinScreen } = useUIStore();

    useEffect(() => {
        if (isSm) {
            setMinScreen(true);
            setToggled(false);
            setCollapsed(true);
        } else {
            setMinScreen(false);
            setToggled(true);
            setCollapsed(false);
        }
    }, [isSm, setToggled, setCollapsed, setMinScreen]);

    return null;
}
