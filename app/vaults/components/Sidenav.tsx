"use client";

import { UserButton } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Stack,
} from "@/components/chakra-components";
import useCreateVaultModal from "@/hooks/useCreateVaultModal";
import useFetchVaults from "@/hooks/useFetchVaults";
import VaultList from "./VaultList";
import VaultSkeleton from "./VaultSkeleton";

const Sidenav = () => {
  const { vaultId } = useParams();
  const { onOpen } = useCreateVaultModal();
  const { data: vaults, isLoading } = useFetchVaults();

  return (
    <Grid
      w="250px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto auto 1fr"
      overflow="hidden"
    >
      <HStack
        p={4}
        py={5}
        h={70}
        borderBottom="1px"
        borderColor="gray.200"
        align="center"
        justify="space-between"
      >
        <Heading size="sm">Your Vaults</Heading>
        <UserButton afterSignOutUrl="/" />
      </HStack>
      <Grid p={4} rowGap={4} overflow="hidden" templateRows="auto 1fr">
        <Button onClick={onOpen} colorScheme="teal" rightIcon={<FiPlus />}>
          New Vault
        </Button>
        <Box
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          {isLoading ? (
            <Stack>
              {[...Array(40).keys()].map((i) => (
                <VaultSkeleton key={i} />
              ))}
            </Stack>
          ) : (
            <VaultList vaults={vaults} activeId={vaultId as string} />
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Sidenav;
