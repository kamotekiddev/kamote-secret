"use client";

import * as z from "zod";
import Link from "next/link";
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
  Text,
  FormHelperText,
} from "@/components/chakra-components";

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
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
            <Button type="submit" loadingText="Submitting" colorScheme="blue">
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
