import { Flex, Grid } from "@radix-ui/themes";

import Skeleton from "@/_components/Skeleton";

const loading = () => {
  return (
    <Grid columns={{ initial: "1", md: "2" }} className=" content-center">
      <Flex direction={"column"} gap={"2"}>
        <Flex className=" block justify-center content-center md:flex">
          <Skeleton />
          <Skeleton />
        </Flex>
        <Skeleton />
      </Flex>
      <Skeleton />
    </Grid>
  );
};

export default loading;
