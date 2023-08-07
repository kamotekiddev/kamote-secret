"use client";

import { useEffect } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import FormTextArea from "../forms/FormTextArea";
import useCreateEncryptionKeyModal from "@/hooks/useCreateEncryptionKeyModal";
import { useQuery } from "react-query";
import axios, { AxiosError, isAxiosError } from "axios";
import { User } from "@prisma/client";
import useCreateEncryptionKey from "@/hooks/useCreateEncryptionKey";

const formSchema = z.object({ secretKey: z.string().min(8) });

const defaultValues: z.infer<typeof formSchema> = {
  secretKey: "",
};

interface SuccessResponse {
  data: { currentUser: User };
}
const CreateEncryptionKeyModal = () => {
  const toast = useToast();
  const { isOpen, onClose, onOpen } = useCreateEncryptionKeyModal();
  const { mutateAsync: createEncrytpionKey, isLoading } =
    useCreateEncryptionKey();

  const { data } = useQuery<SuccessResponse, AxiosError, User>({
    queryFn: () => axios.get("/api/user"),
    queryKey: ["current-user"],
    select: (response) => response.data.currentUser,
    onSuccess: ({ secretKey }) => !secretKey && onOpen(),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleCreatePhrase = () => {};

  const handleClose = () => data?.id && data.secretKey && onClose();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await createEncrytpionKey(values.secretKey);
      toast({ title: "Success", description: data.message, status: "success" });
      onClose();
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Error",
          description:
            error.response?.data.message || "Please try again later.",
          status: "error",
        });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <Heading size="md">Create Encryption Phrase</Heading>
          <Text mt={4} fontSize="sm" color="gray.500" fontWeight="medium">
            Note: what you put here will be asked the moment you decrypt any of
            your secret
          </Text>
        </ModalHeader>
        <ModalBody>
          <FormTextArea
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
            <Button
              type="submit"
              colorScheme="green"
              isLoading={isLoading}
              onClick={handleCreatePhrase}
            >
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateEncryptionKeyModal;
