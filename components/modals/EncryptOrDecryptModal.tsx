"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import useRevealSecretModal from "@/hooks/secrets/useRevealSecretModal";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@/components/chakra-components";
import useEncryptOrDecryptSecret from "@/hooks/secrets/api/useEncryptOrDecryptSecret";
import FormInput from "../forms/FormInput";

const formSchema = z.object({
  secretKey: z.string().min(8).nonempty(),
});

const defaultValues: z.infer<typeof formSchema> = { secretKey: "" };

const EncryptOrDecryptModal = () => {
  const toast = useToast();
  const { mutateAsync: encryptOrDecrypt, isLoading } =
    useEncryptOrDecryptSecret();
  const { isOpen, onClose, secretId, vaultId, action } = useRevealSecretModal();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => onClose();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await encryptOrDecrypt({
        vaultId,
        secretId,
        secretKey: values.secretKey,
        action: action!,
      });
      toast({ title: "Success", description: data.message, status: "success" });
      reset(defaultValues);
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
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Heading size="md" fontWeight="black">
            {action === "encrypt" ? "Encrypt" : "Decrypt"} Secret
          </Heading>
        </ModalHeader>
        <ModalBody>
          <FormInput
            label="Secret Phrase"
            {...register("secretKey")}
            error={errors.secretKey?.message}
          />
        </ModalBody>
        <ModalFooter>
          <HStack columnGap={4} justify="flex-end">
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button isLoading={isLoading} colorScheme="green" type="submit">
              {action === "encrypt" ? "Encrypt" : "Decrypt"} Secret
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EncryptOrDecryptModal;
