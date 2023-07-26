"use client";

import { FiPlus } from "react-icons/fi";
import {
  Button,
  Grid,
  Heading,
  Stack,
  Text,
} from "@/components/chakra-components";
import useCreateChannelModal from "@/hooks/useCreateChannelModal";
import useFetchChannels from "@/hooks/useFetchChannels";

const Sidenav = () => {
  const { onOpen } = useCreateChannelModal();
  const { data: channels } = useFetchChannels();

  return (
    <Grid
      p={4}
      minW="250px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto 1fr"
      rowGap={6}
    >
      <Stack spacing={4}>
        <Heading size="sm">Your Channels</Heading>
        <Button onClick={onOpen} colorScheme="green" leftIcon={<FiPlus />}>
          Create
        </Button>
      </Stack>
      <Stack spacing={0}>
        {channels?.map((channel) => (
          <Button justifyContent="flex-start" key={channel.id}>
            {channel.name}
          </Button>
        ))}
      </Stack>
    </Grid>
  );
};

export default Sidenav;
