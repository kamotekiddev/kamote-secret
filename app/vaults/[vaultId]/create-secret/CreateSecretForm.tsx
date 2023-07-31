"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import {
  Box,
  Button,
  Card,
  CardBody,
  CloseButton,
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
  Textarea,
} from "@/components/chakra-components";

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
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof formSchema>>({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "secrets",
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
          <Button type="submit" colorScheme="teal">
            Save Secret
          </Button>
        </HStack>
      </Stack>
    </Box>
  );
};

export default CreateSecretForm;
