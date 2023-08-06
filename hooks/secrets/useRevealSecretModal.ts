import { create } from "zustand";

interface Modal extends Data {
  isOpen: boolean;
  onOpen: (data: Data) => void;
  onClose: () => void;
}

interface Data {
  vaultId: string;
  secretId: string;
  action?: "encrypt" | "decrypt";
}

const useRevealSecretModal = create<Modal>()((set) => ({
  isOpen: false,
  vaultId: "",
  secretId: "",
  onOpen: ({ vaultId, secretId, action }) =>
    set({ vaultId, secretId, isOpen: true, action }),
  onClose: () =>
    set({ isOpen: false, vaultId: "", secretId: "", action: undefined }),
}));

export default useRevealSecretModal;
