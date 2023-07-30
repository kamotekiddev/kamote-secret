"use client";

import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@/components/chakra-components";

import useDeleteVaultModal from "@/hooks/useDeleteVaultModal";
import useDeleteVault from "@/hooks/useDeleteVault";

const DeleteVaultModal = () => {
  const toast = useToast();
  const router = useRouter();
  const { vaultId } = useParams();

  const deleteChanelModal = useDeleteVaultModal();
  const { mutateAsync: deleteChannel, isLoading } = useDeleteVault();

  const handleClose = () => !isLoading && deleteChanelModal.onClose();

  const handleDelete = async () => {
    try {
      const { data } = await deleteChannel(vaultId as string);
      toast({
        title: "Success",
        description: data.message,
        status: "success",
      });
      handleClose();
      router.replace("/vaults");
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({ title: "Error", description: error.response?.data.message });
    }
  };

  return (
    <Modal {...deleteChanelModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Vault</ModalHeader>
        <ModalBody>Are you sure, you want to delete this vault?</ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={deleteChanelModal.onClose}>Close</Button>
            <Button
              isLoading={isLoading}
              colorScheme="red"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteVaultModal;
