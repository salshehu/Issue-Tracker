import { Box } from "@radix-ui/themes";
import { Skeleton } from "../../components";

const LoadingFormSkeleton = () => {
  return (
    <Box>
      <Skeleton height="2rem" />
      <Skeleton height="20rem" />
    </Box>
  );
};

export default LoadingFormSkeleton;
