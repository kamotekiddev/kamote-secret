import { redirect } from "next/navigation";
import { Center } from "@/components/chakra-components";
import SignInForm from "./SignInForm";
import getCurrentUser from "@/libs/getCurrentUser";

export default async function SignInPage() {
  const user = await getCurrentUser();
  if (user) redirect("/vaults");

  return (
    <Center h="100vh">
      <SignInForm />
    </Center>
  );
}
