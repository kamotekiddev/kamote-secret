import { Divider, HStack, Stack, Text } from "@/components/chakra-components";

interface Props {
  decryptedSecret: { key: string; value: string }[];
}

const DecryptedSecrets = ({ decryptedSecret = [] }: Props) => {
  return (
    <Stack divider={<Divider />}>
      {decryptedSecret?.map((secret) => (
        <HStack key={secret.key}>
          <Text>{secret.key}:</Text>
          <Text>{secret.value}</Text>
        </HStack>
      ))}
    </Stack>
  );
};

export default DecryptedSecrets;
