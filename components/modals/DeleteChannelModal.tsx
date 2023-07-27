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

import useDeleteChannelModal from "@/hooks/useDeleteChannelModal";
import useDeleteChannelMutation from "@/hooks/useDeleteChannelMutation";

const DeleteChannelModal = () => {
  const toast = useToast();
  const router = useRouter();
  const { channelId } = useParams();

  const deleteChanelModal = useDeleteChannelModal();
  const { mutateAsync: deleteChannel, isLoading } = useDeleteChannelMutation();

  const handleClose = () => !isLoading && deleteChanelModal.onClose();

  const handleDelete = async () => {
    try {
      const { data } = await deleteChannel(channelId as string);
      toast({
        title: "Success",
        description: data.message,
        status: "success",
      });
      handleClose();
      router.replace("/channels");
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({ title: "Error", description: error.response?.data.message });
    }
  };

  return (
    <Modal {...deleteChanelModal} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delete Channel</ModalHeader>
        <ModalBody>Are you sure, you want to delete this channel?</ModalBody>
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

export default DeleteChannelModal;
