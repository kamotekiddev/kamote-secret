"use client";

import { useParams } from "next/navigation";
import { FiEdit, FiSettings, FiTrash } from "react-icons/fi";
import {
  Box,
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@/components/chakra-components";

import useDeleteVaultModal from "@/hooks/useDeleteVaultModal";
import useRenameVaultModal from "@/hooks/useRenameVaultModal";
import useFetchVaultById from "@/hooks/useFetchVaultById";

const Header = () => {
  const deleteVaultModal = useDeleteVaultModal();
  const renameVaultModal = useRenameVaultModal();
  const { vaultId } = useParams();
  const { data: vault } = useFetchVaultById(vaultId as string);

  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <Box>
        <Heading size="md">{vault?.name}</Heading>
        <Text fontSize="sm">Stored Secrets ({vault?.secrets.length})</Text>
      </Box>
      <Menu>
        <MenuButton as={Button} leftIcon={<FiSettings />} colorScheme="teal">
          Settings
        </MenuButton>
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
