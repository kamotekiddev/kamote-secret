import { HStack, Skeleton } from "@/components/chakra-components";

const VaultSkeleton = () => {
  return (
    <HStack justify="space-between">
      <Skeleton width="120px" rounded="lg" h="20px" />
      <Skeleton width="20px" rounded="lg" h="20px" />
    </HStack>
  );
};

export default VaultSkeleton;
