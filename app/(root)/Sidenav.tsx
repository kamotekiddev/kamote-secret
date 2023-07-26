"use client";

import { FiPlus } from "react-icons/fi";
import { Button, Grid } from "@/components/chakra-components";
import useCreateChannelModal from "@/hooks/useCreateChannelModal";

const Sidenav = () => {
  const { onOpen } = useCreateChannelModal();

  return (
    <Grid
      p={4}
      minW="250px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto 1fr"
    >
      <Button onClick={onOpen} colorScheme="green" leftIcon={<FiPlus />}>
        Create
      </Button>
    </Grid>
  );
};

export default Sidenav;
