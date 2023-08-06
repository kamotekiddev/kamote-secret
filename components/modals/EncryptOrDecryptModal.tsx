"use client";

import { isAxiosError } from "axios";
import useRevealSecretModal from "@/hooks/secrets/useRevealSecretModal";
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
  Textarea,
  useToast,
} from "@/components/chakra-components";
import useEncryptOrDecryptSecret from "@/hooks/secrets/api/useEncryptOrDecryptSecret";

const EncryptOrDecryptModal = () => {
  const toast = useToast();
  const { mutateAsync: encryptOrDecrypt, isLoading } =
    useEncryptOrDecryptSecret();
  const { isOpen, onClose, secretId, vaultId, action } = useRevealSecretModal();

  const handleClose = () => onClose();
  const handleEncryptOrDecryptSecret = async () => {
    try {
      const { data } = await encryptOrDecrypt({
        vaultId,
        secretId,
        action: action === "encrypt" ? "encrypt" : "decrypt",
      });
      toast({ title: "Success", description: data.message, status: "success" });
      handleClose();
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Error",
          description: error.response?.data.message,
          status: "error",
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading size="md" fontWeight="black">
            {action === "encrypt" ? "Encrypt" : "Decrypt"} Secret
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Textarea />
        </ModalBody>
        <ModalFooter>
          <HStack columnGap={4} justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              colorScheme="green"
              onClick={handleEncryptOrDecryptSecret}
            >
              {action === "encrypt" ? "Encrypt" : "Decrypt"} Secret
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EncryptOrDecryptModal;
