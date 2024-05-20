import { create } from "zustand";

type MobileSidebar = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export const useMobileSidebar = create<MobileSidebar>((set) => ({
    isOpen: false,
    onOpen : () => set({ isOpen: true }),
    onClose : () => set({ isOpen: false }),
}));