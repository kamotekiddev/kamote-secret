import { useSession, signOut } from "next-auth/react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@/components/chakra-components";

const UserButton = () => {
  const { data: session } = useSession();
  return (
    <Menu>
      <MenuButton>
        <Avatar
          size="sm"
          src={session?.user?.image!}
          name={session?.user?.name!}
        />
      </MenuButton>
      <Portal>
        <MenuList>
          <MenuItem onClick={() => signOut()}>Logout</MenuItem>
        </MenuList>
      </Portal>
    </Menu>
  );
};

export default UserButton;
