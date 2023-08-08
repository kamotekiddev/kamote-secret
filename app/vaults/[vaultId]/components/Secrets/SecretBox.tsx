import { Secret } from "@prisma/client";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaLock, FaTrash, FaUnlock } from "react-icons/fa";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@/components/chakra-components";

import useRevealSecretModal from "@/hooks/secrets/useRevealSecretModal";
import DecryptedSecrets from "./DecryptedSecrets";

interface Props {
  secret: Secret;
  onDelete: (secret: Secret) => void;
}

const SecretBox = ({ secret, onDelete }: Props) => {
  const { onOpen } = useRevealSecretModal();

  return (
    <Card>
      <CardHeader>
        <HStack justify="space-between" align="center">
          <HStack columnGap={2} align="center">
            <Heading size="sm" mb={0}>
              {secret.label}
            </Heading>
            <Badge
              variant="solid"
              colorScheme={secret.isDecrypted ? "green" : "red"}
            >
              {secret.isDecrypted ? "Decrypted" : "Encrypted"}
            </Badge>
          </HStack>
          <Menu>
            <MenuButton>
              <IconButton
                size="sm"
                aria-label="Secret Actions"
                icon={<FiMoreHorizontal />}
              />
            </MenuButton>
            <MenuList>
              <MenuItem
                icon={secret.isDecrypted ? <FaLock /> : <FaUnlock />}
                onClick={() =>
                  onOpen({
                    vaultId: secret.vaultId,
                    secretId: secret.id,
                    action: secret?.isDecrypted ? "encrypt" : "decrypt",
                  })
                }
              >
                {secret?.isDecrypted ? "Encrypt" : "Decrypt"}
              </MenuItem>
              <MenuItem icon={<FaTrash />} onClick={() => onDelete(secret)}>
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </CardHeader>
      <CardBody>
        {secret.isDecrypted ? (
          <DecryptedSecrets
            decryptedSecret={JSON.parse(secret.secret || "[]")}
          />
        ) : (
          <Text>{secret.secret}</Text>
        )}
      </CardBody>
    </Card>
  );
};

export default SecretBox;
