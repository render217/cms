import { create } from "zustand";

interface UIState {
    isMinScreen: boolean;
    collapsed: boolean;
    toggled: boolean;
    broken: boolean;
    setMinScreen: (val: boolean) => void;
    setCollapsed: (val: boolean) => void;
    setToggled: (val: boolean) => void;
    setBroken: (val: boolean) => void;
}

const useUIStore = create<UIState>((set) => ({
    isMinScreen: false,
    collapsed: false,
    toggled: false,
    broken: false,
    setMinScreen: (val: boolean) => set(() => ({ isMinScreen: val })),
    setCollapsed: (val: boolean) => set(() => ({ collapsed: val })),
    setToggled: (val: boolean) => set(() => ({ toggled: val })),
    setBroken: (val: boolean) => set(() => ({ broken: val })),
}));

export default useUIStore;
