"use client";

import { Button, HStack, Heading } from "@/components/chakra-components";

import { Channel } from "@prisma/client";
import useDeleteChannelModal from "@/hooks/useDeleteChannelModal";

interface Props {
  channel: Channel;
}

const Header = ({ channel }: Props) => {
  const { onOpen } = useDeleteChannelModal();

  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <Heading size="md">{channel?.name}</Heading>
      <Button colorScheme="red" onClick={onOpen}>
        Delete Channel
      </Button>
    </HStack>
  );
};

export default Header;
