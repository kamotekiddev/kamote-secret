"use client";

import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@/components/chakra-components";
import useCreateChannelModal from "@/hooks/useCreateChannelModal";

const CreateChannelModal = () => {
  const { isOpen, onClose } = useCreateChannelModal();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent as="form">
        <ModalHeader>New Secret Channel</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Channel Name</FormLabel>
            <Input />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant="outline">Close</Button>
            <Button variant="solid" colorScheme="green">
              Create
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateChannelModal;
