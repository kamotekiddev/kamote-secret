"use client";

import { create } from "zustand";

interface Modal {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

const useCreateChannelModal = create<Modal>()((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useCreateChannelModal;
