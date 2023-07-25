import { Center } from "@/components/chakra-components";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <Center minH="100vh">
      <SignUp />
    </Center>
  );
}
