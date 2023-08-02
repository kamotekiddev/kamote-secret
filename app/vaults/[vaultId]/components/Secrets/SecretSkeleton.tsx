import dynamic from "next/dynamic";
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Skeleton,
  SkeletonText,
} from "@/components/chakra-components";

const SecretSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <HStack columnGap={4} align="center">
          <Skeleton height="30px" width="200px" rounded="lg" />
          <Skeleton height="30px" width="30px" rounded="lg" />
        </HStack>
      </CardHeader>
      <CardBody>
        <SkeletonText
          skeletonHeight="20px"
          noOfLines={Math.floor(Math.random() * 4)}
        />
      </CardBody>
    </Card>
  );
};

export default dynamic(() => Promise.resolve(SecretSkeleton), { ssr: false });
