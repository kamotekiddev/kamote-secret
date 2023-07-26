"use client";

import { FiHash, FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Divider,
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
      w="250px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto auto 1fr"
      overflow="hidden"
    >
      <Stack spacing={4} p={4} pb={8} borderBottom="1px" borderColor="gray.200">
        <Heading size="sm">Your Channels</Heading>
        <Button onClick={onOpen} colorScheme="green" leftIcon={<FiPlus />}>
          Create
        </Button>
      </Stack>
      <Box
        overflow="auto"
        p={4}
        css={{
          "&::-webkit-scrollbar": {
            width: "0px",
          },
        }}
      >
        <Stack spacing={0}>
          {channels?.map((channel) => (
            <Button rightIcon={<FiHash />} key={channel.id} variant="ghost">
              <Text
                flex={1}
                fontWeight="normal"
                fontSize="sm"
                textAlign="left"
                isTruncated
              >
                {channel.name}
              </Text>
            </Button>
          ))}
        </Stack>
      </Box>
    </Grid>
  );
};

export default Sidenav;
