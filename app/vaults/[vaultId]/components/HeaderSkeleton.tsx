import { HStack, Skeleton } from "@/components/chakra-components";

const HeaderSkeleton = () => {
  return (
    <HStack
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
      justify="space-between"
      alignItems="center"
    >
      <HStack columnGap={4}>
        <Skeleton height="30px" width="200px" rounded="lg" />
        <Skeleton height="40px" width="80px" rounded="lg" />
      </HStack>
      <Skeleton height="40px" width="40px" rounded="full" />
    </HStack>
  );
};

export default HeaderSkeleton;
