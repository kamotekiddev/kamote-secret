import CryptoJS from "crypto-js";
import { Secret } from "@prisma/client";
import { FaEye } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import {
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  HStack,
  Heading,
  Icon,
  Text,
} from "@/components/chakra-components";

import useRevealSecretModal from "@/hooks/secrets/useRevealSecretModal";

interface Props {
  secret: Secret;
  onDelete: (secret: Secret) => void;
}

const SecretBox = ({ secret, onDelete }: Props) => {
  const { onOpen } = useRevealSecretModal();

  const decryptedSecret = CryptoJS.AES.decrypt(
    secret?.secret || "",
    "myEncryptionSecret"
  )?.toString(CryptoJS.enc.Utf8);

  return (
    <Card>
      <CardHeader>
        <HStack justify="space-between" align="center">
          <HStack columnGap={4} align="center">
            <Heading size="sm">{secret.label}</Heading>
            <Icon
              cursor="pointer"
              as={secret.isDecrypted ? RiGitRepositoryPrivateFill : FaEye}
              onClick={() =>
                onOpen({
                  vaultId: secret.vaultId,
                  secretId: secret.id,
                  action: secret?.isDecrypted ? "encrypt" : "decrypt",
                })
              }
            />
          </HStack>
          <CloseButton onClick={() => onDelete(secret)} />
        </HStack>
      </CardHeader>
      <CardBody>
        <Text as="pre">
          {secret.isDecrypted
            ? JSON.stringify(JSON.parse(decryptedSecret), null, 2)
            : secret.secret}
        </Text>
      </CardBody>
    </Card>
  );
};

export default SecretBox;
