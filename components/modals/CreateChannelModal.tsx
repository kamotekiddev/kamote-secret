"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
} from "@/components/chakra-components";
import useCreateChannelModal from "@/hooks/useCreateChannelModal";
import useCreateChannelMutation from "@/hooks/useCreateChannelMutation";
import { AxiosError, isAxiosError } from "axios";

const formSchema = z.object({
  name: z.string().nonempty(),
});

const defaultValues: z.infer<typeof formSchema> = { name: "" };

const CreateChannelModal = () => {
  const toast = useToast();
  const { isOpen, onClose } = useCreateChannelModal();
  const { mutateAsync: createChannel, isLoading } = useCreateChannelMutation();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleClose = () => {
    reset(defaultValues);
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await createChannel(values);
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
      <ModalContent as="form" onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>New Secret Channel</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Channel Name</FormLabel>
            <Input {...register("name")} />
            <FormHelperText color="red.500">
              {errors.name?.message}
            </FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="outline" onClick={handleClose}>
              Close
            </Button>
            <Button
              isLoading={isLoading}
              variant="solid"
              type="submit"
              colorScheme="green"
            >
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
