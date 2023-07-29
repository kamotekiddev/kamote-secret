"use client";

import { FiEdit, FiSettings, FiTrash } from "react-icons/fi";
import {
  Button,
  HStack,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@/components/chakra-components";

import { Vault } from "@prisma/client";
import useDeleteChannelModal from "@/hooks/useDeleteVaultModal";

interface Props {
  vault: Vault;
}

const Header = ({ vault }: Props) => {
  const { onOpen } = useDeleteChannelModal();

  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <Heading size="md">{vault?.name}</Heading>
      <Menu>
        <MenuButton as={Button} leftIcon={<FiSettings />} colorScheme="teal">
          Settings
        </MenuButton>
        <MenuList>
          <MenuItem icon={<FiTrash />} onClick={onOpen}>
            Delete Vault
          </MenuItem>
          <MenuItem icon={<FiEdit />} onClick={onOpen}>
            Rename Vault
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default Header;
