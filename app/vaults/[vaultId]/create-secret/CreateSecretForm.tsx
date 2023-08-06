"use client";

import * as z from "zod";
import { useParams, useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  HStack,
  Heading,
  IconButton,
  Stack,
  useToast,
} from "@/components/chakra-components";
import useCreateSecret from "@/hooks/secrets/api/useCreateSecret";
import FormInput from "@/components/forms/FormInput";

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
  const router = useRouter();
  const { vaultId } = useParams();
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

  const handleCancel = () => router.back();

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack rowGap={4} divider={<Divider />}>
        <HStack columnGap={4} align="center">
          <Heading size="md" fontWeight="black">
            Create your secret
          </Heading>
        </HStack>
        <Card>
          <CardBody>
            <FormInput
              label="Label"
              {...register("label")}
              isRequired
              error={errors.label?.message}
            />
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
                <FormInput
                  label="Key"
                  {...register(`secrets.${i}.key`)}
                  isRequired
                  error={errors.secrets?.[i]?.key?.message}
                />
                <FormInput
                  label="Value"
                  {...register(`secrets.${i}.value`)}
                  isRequired
                  error={errors.secrets?.[i]?.value?.message}
                />
              </HStack>
            </CardBody>
          </Card>
        ))}
        <HStack justify="flex-end">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button isLoading={isLoading} type="submit" colorScheme="teal">
            Save Secret
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CreateSecretForm;
