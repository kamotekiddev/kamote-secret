import { create } from "zustand";

interface Modal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRenameVaultModal = create<Modal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useRenameVaultModal;
