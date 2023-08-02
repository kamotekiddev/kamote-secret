"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { FiEdit, FiPlus, FiSettings, FiTrash } from "react-icons/fi";
import {
  Button,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@/components/chakra-components";

import useDeleteVaultModal from "@/hooks/useDeleteVaultModal";
import useRenameVaultModal from "@/hooks/useRenameVaultModal";
import useFetchVaultById from "@/hooks/useFetchVaultById";
import HeaderSkeleton from "./HeaderSkeleton";

const Header = () => {
  const { vaultId } = useParams();
  const deleteVaultModal = useDeleteVaultModal();
  const renameVaultModal = useRenameVaultModal();

  const { data: vault, isLoading } = useFetchVaultById(vaultId as string);

  const SECRET_COUNT = vault?.secrets.length || 0;
  const TITLE = `${vault?.name} ${SECRET_COUNT > 0 ? `(${SECRET_COUNT})` : ""}`;

  if (isLoading) return <HeaderSkeleton />;

  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <HStack columnGap={6} align="center">
        <Heading size="md" mb={0}>
          {TITLE}
        </Heading>
        {SECRET_COUNT > 0 && (
          <Button
            as={Link}
            size="sm"
            href={`/vaults/${vault?.id}/create-secret`}
            colorScheme="teal"
            rightIcon={<FiPlus />}
          >
            Create
          </Button>
        )}
      </HStack>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<FiSettings />}
          colorScheme="teal"
          rounded="full"
        />
        <MenuList>
          <MenuItem icon={<FiTrash />} onClick={deleteVaultModal.onOpen}>
            Delete Vault
          </MenuItem>
          <MenuItem icon={<FiEdit />} onClick={renameVaultModal.onOpen}>
            Rename Vault
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Header;
