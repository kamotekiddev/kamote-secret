"use client";

import { isAxiosError } from "axios";
import {
  Button,
  HStack,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@/components/chakra-components";
import useDeleteSecret from "@/hooks/secrets/api/useDeleteSecret";
import useDeleteSecretModal from "@/hooks/secrets/useDeleteSecretModal";

const DeleteSecretModal = () => {
  const toast = useToast();
  const { isOpen, secret, onClose } = useDeleteSecretModal();
  const { mutateAsync: deleteSecret, isLoading } = useDeleteSecret();

  const handleClose = () => onClose();
  const handleDeleteSecret = async () => {
    try {
      const { data } = await deleteSecret({
        secretId: secret?.id!,
        vaultId: secret?.vaultId!,
      });
      toast({ title: "Success", description: data.message, status: "success" });
      handleClose();
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Something went wrong",
          description: error.response?.data.message || "Please try again later",
          status: "error",
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">Delete Secret</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>Are you sure? you wont be able to revert this.</Text>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              isLoading={isLoading}
              onClick={handleDeleteSecret}
            >
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSecretModal;
