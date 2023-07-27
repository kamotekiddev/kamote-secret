"use client";

import { isAxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import {
  Button,
  HStack,
  Heading,
  useToast,
} from "@/components/chakra-components";

import useDeleteChannelMutation from "@/hooks/useDeleteChannelMutation";
import useDeleteChannelModal from "@/hooks/useDeleteChannelModal";

const Header = () => {
  const { onOpen } = useDeleteChannelModal();

  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <Heading size="md">Kamote Secret</Heading>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Channel
      </Button>
    </HStack>
  );
};

export default Header;
