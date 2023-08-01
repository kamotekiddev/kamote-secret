"use client";

import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Card,
  CardBody,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Icon,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from "@/components/chakra-components";
import useCreateSecret from "@/hooks/useCreateSecret";

const formSchema = z.object({
  label: z.string().nonempty(),
  secrets: z.array(
    z.object({ key: z.string().nonempty(), value: z.string().nonempty() })
  ),
});

const defaultValues: z.infer<typeof formSchema> = {
  label: "",
  secrets: [{ key: "", value: "" }],
};

const CreateSecretForm = () => {
  const toast = useToast();
  const { vaultId } = useParams();
  const router = useRouter();
  const { mutateAsync: createSecret, isLoading } = useCreateSecret();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "secrets",
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { data } = await createSecret({
        vaultId: vaultId as string,
        data: { label: values.label, secret: values.secrets },
      });
      reset(defaultValues);
      router.replace(`/vaults/${vaultId}`);
      toast({ title: "Success", description: data.message, status: "success" });
    } catch (error) {
      if (isAxiosError<{ message: string }>(error))
        toast({
          title: "Error",
          description: error.response?.data?.message,
          status: "error",
        });
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack rowGap={4}>
        <HStack columnGap={4} align="center">
          <Heading size="lg" fontWeight="black">
            Create your secret
          </Heading>
          <Icon w={42} h={42} as={RiGitRepositoryPrivateFill} />
        </HStack>
        <Text>
          Kamote-Secret: 🍠🔒 Store your secret here, safe from prying eyes.
          Share your truth with confidence. #KamoteSecret #KeepItSafe 🗝️🏰
        </Text>
        <Card>
          <CardBody>
            <FormControl>
              <FormLabel>Label</FormLabel>
              <Input {...register("label")} />
              <FormHelperText color="red">
                {errors.label?.message}
              </FormHelperText>
            </FormControl>
          </CardBody>
        </Card>
        <HStack align="center" justify="space-between">
          <Heading size="md" fontWeight="black">
            Secrets
          </Heading>
          <IconButton
            icon={<FiPlus />}
            colorScheme="teal"
            size="sm"
            onClick={() => append({ key: "", value: "" })}
            aria-label="Add Button"
          />
        </HStack>
        {fields.map((field, i) => (
          <Card key={field.id}>
            <CardBody>
              <HStack columnGap={6}>
                <FormControl>
                  <FormLabel mb={0}>Key</FormLabel>
                  <Input {...register(`secrets.${i}.key`)} />
                  <FormHelperText color="red">
                    {errors?.secrets?.[i]?.key?.message}
                  </FormHelperText>
                </FormControl>
                <FormControl>
                  <FormLabel mb={0}>Value</FormLabel>
                  <Input {...register(`secrets.${i}.value`)} />
                  <FormHelperText color="red">
                    {errors?.secrets?.[i]?.value?.message}
                  </FormHelperText>
                </FormControl>
              </HStack>
            </CardBody>
          </Card>
        ))}
        <HStack justify="flex-end">
          <Button>Cancel</Button>
          <Button isLoading={isLoading} type="submit" colorScheme="teal">
            Save Secret
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CreateSecretForm;
