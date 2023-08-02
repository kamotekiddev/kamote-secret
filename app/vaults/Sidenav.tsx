"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { FiPlus } from "react-icons/fi";
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
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

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
      <HStack
        p={4}
        py={5}
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
          <Stack spacing={0}>
            {vaults?.map((vault) => (
              <Button
                as={Link}
                href={`/vaults/${vault.id}`}
                rightIcon={<RiGitRepositoryPrivateFill />}
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
    </Grid>
  );
};

export default Sidenav;
