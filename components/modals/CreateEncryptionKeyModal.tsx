"use client";

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
} from "@/components/chakra-components";
import FormTextArea from "../forms/FormTextArea";

const formSchema = z.object({ secretKey: z.string().min(8) });

const defaultValues: z.infer<typeof formSchema> = {
  secretKey: "",
};

const CreateEncryptionKeyModal = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleCreatePhrase = () => {};

  const handleClose = () => {};
  const onSubmit = () => {};

  return (
    <Modal isOpen onClose={handleClose} isCentered>
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
            <Button variant="outline">Close</Button>
            <Button
              type="submit"
              colorScheme="green"
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
