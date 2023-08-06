"use client";

import * as z from "zod";
import Link from "next/link";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  FormHelperText,
  useToast,
} from "@/components/chakra-components";
import useRegister from "@/hooks/auth/useRegister";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  name: z.string().nonempty({ message: "This field is required" }),
  email: z.string().email().nonempty({ message: "This field is required" }),
  password: z.string().nonempty({ message: "This field is required" }),
});

const defaultValues: z.infer<typeof formSchema> = {
  email: "",
  password: "",
  name: "",
};

export default function SignUpForm() {
  const toast = useToast();
  const router = useRouter();
  const { mutateAsync: registerAccount, isLoading } = useRegister();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await registerAccount(values);
      toast({ title: "Success", description: data.message, status: "success" });
      signIn("credentials", { ...values, redirect: false }).then((response) => {
        if (response?.error) return router.replace("/sign-in");
        return router.replace("/vaults");
      });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Error",
          description:
            error.response?.data.message || "Please try again later.",
          status: "error",
        });
    }
  };

  return (
    <Stack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      spacing={8}
      mx={"auto"}
      w="full"
      maxW={"xl"}
      py={12}
      px={6}
    >
      <Box rounded={"lg"} boxShadow={"lg"} p={8}>
        <Stack align={"center"} mb={8}>
          <Heading fontSize="3xl" fontWeight="black" textAlign={"center"}>
            Create Account
          </Heading>
        </Stack>
        <Stack spacing={4}>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input {...register("name")} />
            <FormHelperText>{errors.name?.message}</FormHelperText>
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input type="email" {...register("email")} />
            <FormHelperText>{errors.email?.message}</FormHelperText>
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input {...register("password")} />
            <FormHelperText>{errors.password?.message}</FormHelperText>
          </FormControl>
          <Stack spacing={10} pt={2}>
            <Button type="submit" isLoading={isLoading} colorScheme="blue">
              Sign up
            </Button>
          </Stack>
          <Stack pt={6}>
            <Button as={Link} href="/sign-in" variant="link">
              Already have and account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
