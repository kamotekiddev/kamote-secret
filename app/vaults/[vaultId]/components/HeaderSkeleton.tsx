import {
  HStack,
  Skeleton,
  SkeletonCircle,
} from "@/components/chakra-components";

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
      <SkeletonCircle size="10" />
    </HStack>
  );
};

export default HeaderSkeleton;
