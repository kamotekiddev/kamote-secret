import { Secret } from "@prisma/client";
import { create } from "zustand";

interface DeleteSecretModal {
  isOpen: boolean;
  secret?: Secret;
  onClose: () => void;
  onOpen: (secret: Secret) => void;
}

const useDeleteSecretModal = create<DeleteSecretModal>()((set) => ({
  isOpen: false,
  secret: undefined,
  onOpen: (secret) => set({ secret, isOpen: true }),
  onClose: () => set({ isOpen: false, secret: undefined }),
}));

export default useDeleteSecretModal;
