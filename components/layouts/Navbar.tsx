import { UserButton } from "@clerk/nextjs";
import { HStack, Heading } from "@/components/chakra-components";

const Navbar = () => {
  return (
    <HStack
      borderBottom="1px"
      borderColor="gray.200"
      minH="70px"
      justify="space-between"
      p={4}
      align="center"
    >
      <Heading size="md" fontWeight="black">
        Kamote
      </Heading>
      <HStack>
        <UserButton afterSignOutUrl="/" />
      </HStack>
    </HStack>
  );
};

export default Navbar;
