"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { FiHash, FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Stack,
  Text,
} from "@/components/chakra-components";
import useCreateVaultModal from "@/hooks/useCreateVaultModal";
import useFetchVaults from "@/hooks/useFetchVaults";

const Sidenav = () => {
  const { onOpen } = useCreateVaultModal();
  const { data: vaults } = useFetchVaults();
  const { vaultId } = useParams();

  return (
    <Grid
      w="250px"
      borderRight="1px"
      borderColor="gray.200"
      templateRows="auto auto 1fr"
      overflow="hidden"
    >
      <Stack spacing={6} p={4} pb={8} borderBottom="1px" borderColor="gray.200">
        <HStack h={42} align="center" justify="space-between">
          <Heading size="sm">Your Vaults</Heading>
          <UserButton afterSignOutUrl="/" />
        </HStack>
        <Button onClick={onOpen} colorScheme="teal" rightIcon={<FiPlus />}>
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
          {vaults?.map((vault) => (
            <Button
              as={Link}
              href={`/vaults/${vault.id}`}
              rightIcon={<FiHash />}
              key={vault.id}
              variant={vaultId === vault.id ? "solid" : "ghost"}
            >
              <Text flex={1} fontSize="sm" textAlign="left" isTruncated>
                {vault.name}
              </Text>
            </Button>
          ))}
        </Stack>
      </Box>
    </Grid>
  );
};

export default Sidenav;
