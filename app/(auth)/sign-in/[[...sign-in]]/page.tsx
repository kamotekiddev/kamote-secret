import { SignIn } from "@clerk/nextjs";
import { Center } from "@/components/chakra-components";

export default function Page() {
  return (
    <Center minH="100vh">
      <SignIn />
    </Center>
  );
}
