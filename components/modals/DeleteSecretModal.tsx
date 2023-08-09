"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormInput from "../forms/FormInput";

const formSchema = z.object({ secretKey: z.string().nonempty() });
const defaultValues: z.infer<typeof formSchema> = {
  secretKey: "",
};

const DeleteSecretModal = () => {
  const toast = useToast();
  const { isOpen, secret, onClose } = useDeleteSecretModal();
  const { mutateAsync: deleteSecret, isLoading } = useDeleteSecret();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => onClose();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await deleteSecret({
        secretId: secret?.id!,
        vaultId: secret?.vaultId!,
        secretKey: values.secretKey,
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
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Heading size="md">Delete Secret</Heading>
        </ModalHeader>
        <ModalBody>
          <Text>Are you sure? you wont be able to revert this.</Text>
          <FormInput
            isRequired
            label="Secret Phrase"
            {...register("secretKey")}
            error={errors.secretKey?.message}
          />
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button colorScheme="red" isLoading={isLoading} type="submit">
              Delete
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteSecretModal;
