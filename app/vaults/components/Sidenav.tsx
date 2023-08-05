"use client";

import { useParams } from "next/navigation";
import { FiPlus } from "react-icons/fi";
import { Box, Button, Grid, Text } from "@/components/chakra-components";

import useCreateVaultModal from "@/hooks/useCreateVaultModal";
import useFetchVaults from "@/hooks/useFetchVaults";
import VaultList from "./VaultList";
import UserButton from "@/components/UserButton";

const Sidenav = () => {
  const { onOpen } = useCreateVaultModal();
  const { vaultId } = useParams();
  const { data: vaults, isLoading } = useFetchVaults();

  return (
    <Grid
      w="270px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto 1fr auto"
      overflow="hidden"
      rowGap={4}
    >
      <Box p={4}>
        <Button
          w="full"
          onClick={onOpen}
          variant="outline"
          rightIcon={<FiPlus />}
        >
          New Vault
        </Button>
      </Box>
      <Grid templateRows="auto 1fr">
        <Box px={8}>
          <Text fontSize="sm" fontWeight="bold" color="teal">
            Your Vaults
          </Text>
        </Box>
        <Box
          p={4}
          overflow="auto"
          css={{
            "&::-webkit-scrollbar": {
              width: "0px",
            },
          }}
        >
          <VaultList
            isLoading={isLoading}
            vaults={vaults}
            activeId={vaultId as string}
          />
        </Box>
      </Grid>
      <Box p={4} borderTopWidth="1px" borderTopColor="gray.200">
        <UserButton />
      </Box>
    </Grid>
  );
};

export default Sidenav;
