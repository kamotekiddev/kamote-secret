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

import { Secret } from "@prisma/client";

interface Props {
  secret: Secret;
  onDelete: (secret: Secret) => void;
}

const SecretBox = ({ secret, onDelete }: Props) => {
  return (
    <Card>
      <CardHeader>
        <HStack columnGap={4} align="center">
          <Heading size="sm">{secret.label}</Heading>
          <Icon as={RiGitRepositoryPrivateFill} />
          <CloseButton onClick={() => onDelete(secret)} />
        </HStack>
      </CardHeader>
      <CardBody>
        <Text>{secret.secret}</Text>
      </CardBody>
    </Card>
  );
};

export default SecretBox;
