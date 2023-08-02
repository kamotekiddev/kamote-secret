import Link from "next/link";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { Button, Stack, Text } from "@/components/chakra-components";

import { Vault } from "@prisma/client";

interface Props {
  vaults?: Vault[];
  activeId?: string;
}

const VaultList = ({ vaults, activeId }: Props) => {
  return (
    <Stack spacing={0}>
      {vaults?.map((vault) => (
        <Button
          as={Link}
          href={`/vaults/${vault.id}`}
          rightIcon={<RiGitRepositoryPrivateFill />}
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
