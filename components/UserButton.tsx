import { FiLogOut, FiMoreHorizontal } from "react-icons/fi";
import { useSession, signOut } from "next-auth/react";
import {
  Avatar,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
} from "@/components/chakra-components";

const UserButton = () => {
  const { data: session } = useSession();

  return (
    <Menu>
      <MenuButton role="group">
        <HStack
          p={2}
          columnGap={5}
          w="full"
          rounded="lg"
          align="center"
          transition="all 300ms ease"
          _groupHover={{ bg: "gray.100" }}
          zIndex={1000}
        >
          <Avatar
            size="sm"
            src={session?.user?.image!}
            name={session?.user?.name!}
          />
          <Box flex={1} overflow="hidden">
            <Text fontSize="sm" fontWeight="medium" isTruncated>
              {session?.user?.name}
            </Text>
          </Box>
          <FiMoreHorizontal />
        </HStack>
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={() => signOut()} icon={<FiLogOut />}>
            Sign Out
          </MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default UserButton;
