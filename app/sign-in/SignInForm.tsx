"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaGoogle } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  Divider,
  FormHelperText,
  useToast,
} from "@/components/chakra-components";

const formSchema = z.object({
  email: z.string().email().nonempty(),
  password: z.string().nonempty(),
});

const defaultValues: z.infer<typeof formSchema> = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const toast = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = () => signIn("google", { callbackUrl: "/vaults" });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    signIn("credentials", {
      ...values,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error)
          return toast({
            title: "Error",
            description: "Invalid Credentials",
            status: "error",
          });
        return router.replace("/vaults");
      })
      .catch((err) =>
        toast({
          title: "Error",
          description: "Internal Server Error",
          status: "error",
        })
      )
      .finally(() => setLoading(false));
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={8}
      w="full"
      maxW="xl"
      py={12}
      px={6}
    >
      <Box rounded="lg" boxShadow="lg" p={8}>
        <Stack align="center" mb={8}>
          <Heading fontSize="3xl" fontWeight="black">
            Sign in to your account
          </Heading>
        </Stack>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register("email")} />
            <FormHelperText color="red.500">
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input type="password" {...register("password")} />
            <FormHelperText color="red.500">
              {errors.password?.message}
            </FormHelperText>
          </FormControl>
          <Stack spacing={10}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"blue.400"}>Forgot password?</Text>
            </Stack>
            <Stack rowGap={4}>
              <Button isLoading={loading} colorScheme="blue" type="submit">
                Sign in
              </Button>
              <Divider />
              <Button leftIcon={<FaGoogle />} onClick={handleGoogleLogin}>
                Continue with Google
              </Button>
            </Stack>
            <Button as={Link} type="button" href="/sign-up" variant="link">
              Need an account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
