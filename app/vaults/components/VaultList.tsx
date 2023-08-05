import Link from "next/link";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Button, Spinner, Stack, Text } from "@/components/chakra-components";

import { Vault } from "@prisma/client";

interface Props {
  vaults?: Vault[];
  activeId?: string;
  isLoading?: boolean;
}

const VaultList = ({ isLoading, vaults, activeId }: Props) => {
  return (
    <Stack spacing={0}>
      {isLoading && <Spinner mx={4} />}
      {vaults?.map((vault) => (
        <Button
          as={Link}
          href={`/vaults/${vault.id}`}
          leftIcon={<RiGitRepositoryPrivateFill />}
          key={vault.id}
          variant={activeId === vault.id ? "solid" : "ghost"}
        >
          <Text flex={1} fontSize="sm" textAlign="left" isTruncated>
            {vault.name}
          </Text>
        </Button>
      ))}
    </Stack>
  );
};

export default VaultList;
