"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import {
  Button,
  Center,
  Heading,
  Icon,
  Stack,
  Text,
} from "@/components/chakra-components";

const EmptyVault = () => {
  const { vaultId } = useParams();

  return (
    <Center h="full">
      <Stack rowGap={6} maxW="xl" align="center" textAlign="center">
        <Icon w={50} h={50} as={RiGitRepositoryPrivateFill} />
        <Heading size="md">The vault is empty</Heading>
        <Text>
          Currently the vault is empty. you can create up to 20 secrets per
          vault.
        </Text>

        <Link href={`/vaults/${vaultId}/create-secret`}>
          <Button w="max" size="sm" colorScheme="teal">
            Create Secret
          </Button>
        </Link>
      </Stack>
    </Center>
  );
};

export default EmptyVault;
